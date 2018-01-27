from django.utils.translation import ugettext as _

from .number_to_words import NumberToWords


class NumberOfPossibilities(object):
    @classmethod
    def get_number_of_possibilities(cls, number: str) -> int:
        number = NumberToWords.sanitize_and_check_number(number)

        if not number:
            return 0
        if len(number) > NumberToWords.MAX_LENGTH_OF_NUMBER:
            raise ValueError(_('The maximum length of the number is %(max_length_of_number)i.') % {
                'max_length_of_number': NumberToWords.MAX_LENGTH_OF_NUMBER})

        number_of_possibilities = 1

        splitted_numbers = NumberToWords.split_by_split_chars_and_split_digits(number)
        for splitted_number in splitted_numbers:
            number_of_sub_possibilities = cls.__get_number_of_possibilities(splitted_number)
            number_of_possibilities *= number_of_sub_possibilities

        return number_of_possibilities

    @classmethod
    def __get_number_of_possibilities(cls, number: str) -> int:
        number_of_possibilities = 0

        if number:
            number_of_possibilities_whole_number = 1
            for digit in number:
                number_of_possibilities_whole_number *= cls.__digit_to_number_of_possibilities(digit)

            number_of_possible_subwords = 2 ** (len(number) - 1)

            number_of_possibilities = number_of_possibilities_whole_number * number_of_possible_subwords

        return number_of_possibilities

    @classmethod
    def __digit_to_number_of_possibilities(cls, digit: str) -> int:
        return len(NumberToWords.DIGIT_TO_CHAR[digit])
