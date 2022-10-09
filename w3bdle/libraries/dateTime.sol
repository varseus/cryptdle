pragma solidity ^0.8.0;

import "hardhat/console.sol";

// from https://github.com/bokkypoobah/BokkyPooBahsDateTimeLibrary

library DateTime {
    int constant OFFSET19700101 = 2440588;
    uint public constant SECONDS_PER_DAY = 24 * 60 * 60;
    uint256 constant SECONDS_IN_MINUTE = 60;
    uint256 constant SECONDS_IN_HOUR = 3600;
    uint256 constant SECONDS_IN_DAY = 86400;
    uint256 constant SECONDS_IN_YEAR = 31536000;
    uint256 constant SECONDS_IN_FOUR_YEARS_WITH_LEAP_YEAR = 126230400;
    uint256 constant SECONDS_BETWEEN_JAN_1_1972_AND_DEC_31_1999 = 883612800;
    uint256 constant SECONDS_IN_100_YEARS = 3155673600;
    uint256 constant SECONDS_IN_400_YEARS = 12622780800;

    function convertTimestampToYMDHMS(uint256 _dt)
        internal
        pure
        returns (
            uint16 year,
            uint8 month,
            uint8 day,
            uint8 hour,
            uint8 minute,
            uint8 second
        )
    {
        uint256 secondsRemaining = _dt;

        (secondsRemaining, year) = getYear(secondsRemaining);
        (secondsRemaining, month) = getMonth(secondsRemaining, year);
        (secondsRemaining, day) = getDay(secondsRemaining);
        (secondsRemaining, hour) = getHour(secondsRemaining);
        (secondsRemaining, minute) = getMinute(secondsRemaining);
        second = uint8(secondsRemaining);
    }

    // functions to calculate year, month, or day from timestamp
    function getYear(uint256 _secondsRemaining)
        private
        pure
        returns (uint256 secondsRemaining, uint16 year)
    {
        uint256 res;
        uint32 secondsInThisYear;

        secondsRemaining = _secondsRemaining;
        year = 1970;

        if (secondsRemaining < (2 * SECONDS_IN_YEAR)) {
            res = secondsRemaining / SECONDS_IN_YEAR;
            secondsRemaining -= res * SECONDS_IN_YEAR;
            year += uint16(res);
        } else {
            secondsRemaining -= 2 * SECONDS_IN_YEAR;
            year = 1972;

            if (
                secondsRemaining >= SECONDS_BETWEEN_JAN_1_1972_AND_DEC_31_1999
            ) {
                secondsRemaining -= SECONDS_BETWEEN_JAN_1_1972_AND_DEC_31_1999;
                year += 28;

                res = secondsRemaining / SECONDS_IN_400_YEARS;
                secondsRemaining -= res * SECONDS_IN_400_YEARS;
                year += uint16(res * 400);

                secondsInThisYear = uint32(getSecondsInYear(year));

                if (secondsRemaining >= secondsInThisYear) {
                    secondsRemaining -= secondsInThisYear;
                    year += 1;
                }

                if (!isLeapYear(year)) {
                    res = secondsRemaining / SECONDS_IN_100_YEARS;
                    secondsRemaining -= res * SECONDS_IN_100_YEARS;
                    year += uint16(res * 100);
                }
            }

            res = secondsRemaining / SECONDS_IN_FOUR_YEARS_WITH_LEAP_YEAR;
            secondsRemaining -= res * SECONDS_IN_FOUR_YEARS_WITH_LEAP_YEAR;
            year += uint16(res * 4);

            secondsInThisYear = uint32(getSecondsInYear(year));

            if (secondsRemaining >= secondsInThisYear) {
                secondsRemaining -= secondsInThisYear;
                year += 1;
            }

            if (!isLeapYear(year)) {
                res = secondsRemaining / SECONDS_IN_YEAR;
                secondsRemaining -= res * SECONDS_IN_YEAR;
                year += uint16(res);
            }
        }
    }

    function getMonth(uint256 _secondsRemaining, uint16 _year)
        private
        pure
        returns (uint256 secondsRemaining, uint8 month)
    {
        uint8[13] memory monthDayMap;
        uint32[13] memory monthSecondsMap;

        secondsRemaining = _secondsRemaining;

        if (isLeapYear(_year)) {
            monthDayMap = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            monthSecondsMap = [
                0,
                2678400,
                5184000,
                7862400,
                10454400,
                13132800,
                15724800,
                18403200,
                21081600,
                23673600,
                26352000,
                28944000,
                31622400
            ];
        } else {
            monthDayMap = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            monthSecondsMap = [
                0,
                2678400,
                5097600,
                7776000,
                10368000,
                13046400,
                15638400,
                18316800,
                20995200,
                23587200,
                26265600,
                28857600,
                31536000
            ];
        }

        for (uint8 i = 1; i < 13; i++) {
            if (secondsRemaining < monthSecondsMap[i]) {
                month = i;
                secondsRemaining -= monthSecondsMap[i - 1];
                break;
            }
        }
    }

    function getDay(uint256 _secondsRemaining)
        private
        pure
        returns (uint256 secondsRemaining, uint8 day)
    {
        uint256 res;

        secondsRemaining = _secondsRemaining;

        res = secondsRemaining / SECONDS_IN_DAY;
        secondsRemaining -= res * SECONDS_IN_DAY;
        day = uint8(res + 1);
    }

    // functions to get hours and minutes from timestamp
    function getHourOrMinute(uint256 _secondsRemaining, uint256 _divisor)
        private
        pure
        returns (uint256 secondsRemaining, uint8 hourOrMinute)
    {
        uint256 res;

        secondsRemaining = _secondsRemaining;

        res = secondsRemaining / _divisor;
        secondsRemaining -= res * _divisor;
        hourOrMinute = uint8(res);
    }

    function getHour(uint256 _secondsRemaining)
        private
        pure
        returns (uint256 secondsRemaining, uint8 hour)
    {
        return getHourOrMinute(_secondsRemaining, SECONDS_IN_HOUR);
    }

    function getMinute(uint256 _secondsRemaining)
        private
        pure
        returns (uint256 secondsRemaining, uint8 minute)
    {
        return getHourOrMinute(_secondsRemaining, SECONDS_IN_MINUTE);
    }

    function isLeapYear(uint16 _year) internal pure returns (bool) {
        if ((_year % 4) != 0) {
            return false;
        }
        if (((_year % 400) == 0) || ((_year % 100) != 0)) {
            return true;
        }

        return false;
    }

    function getSecondsInYear(uint16 _year) private pure returns (uint256) {
        if (isLeapYear(_year)) {
            return (SECONDS_IN_YEAR + SECONDS_IN_DAY);
        } else {
            return SECONDS_IN_YEAR;
        }
    }

    function timestampFromDate(uint year, uint month, uint day) internal pure returns (uint timestamp) {
        timestamp = _daysFromDate(year, month, day) * SECONDS_PER_DAY;
    }

    function _daysFromDate(uint year, uint month, uint day) internal pure returns (uint _days) {
        require(year >= 1970);
        int _year = int(year);
        int _month = int(month);
        int _day = int(day);

        int __days = _day
          - 32075
          + 1461 * (_year + 4800 + (_month - 14) / 12) / 4
          + 367 * (_month - 2 - (_month - 14) / 12 * 12) / 12
          - 3 * ((_year + 4900 + (_month - 14) / 12) / 100) / 4
          - OFFSET19700101;

        _days = uint(__days);
    }
}
