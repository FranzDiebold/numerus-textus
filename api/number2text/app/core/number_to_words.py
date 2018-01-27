from typing import List, Tuple
import itertools

from django.core.cache import cache
from django.utils.translation import ugettext as _

from .language_manager import LanguageManager


class NumberToWords(object):
    SPLIT_CHARS = ['-', '/']
    SPLIT_DIGITS = ['0', '1']
    DIGIT_TO_CHAR = {
        '0': ['0'],
        '1': ['1'],
        '2': ['a', 'b', 'c'],
        '3': ['d', 'e', 'f'],
        '4': ['g', 'h', 'i'],
        '5': ['j', 'k', 'l'],
        '6': ['m', 'n', 'o'],
        '7': ['p', 'q', 'r', 's'],
        '8': ['t', 'u', 'v'],
        '9': ['w', 'x', 'y', 'z']
    }
    DEFAULT_NUMBER_OF_RESULTS = 7
    MAX_LENGTH_OF_NUMBER = 16
    MAX_COST = 150

    def __init__(self, language_string: str=None):
        self.__language_manager = LanguageManager(language_string)

    def number_to_words(self, number: str, max_number_of_sub_words: int=DEFAULT_NUMBER_OF_RESULTS) -> List[List[List[str]]]:
        number = self.__class__.sanitize_and_check_number(number)

        if len(number) > self.__class__.MAX_LENGTH_OF_NUMBER:
            raise ValueError(_('The maximum length of the number is %(max_length_of_number)i.') % {'max_length_of_number': self.__class__.MAX_LENGTH_OF_NUMBER})

        existing_words = []

        splitted_numbers = self.__class__.split_by_split_chars_and_split_digits(number)
        if self._get_cost(splitted_numbers) > self.__class__.MAX_COST:
            raise ValueError(_('I am sorry, but this is too complicated for me.'))

        for splitted_number in splitted_numbers:
            # using cache: '542_test'
            existing_words_for_splitted_number = cache.get(self.__get_number_to_words_cache_key(splitted_number))
            if not existing_words_for_splitted_number:
                sub_numbers = self._number_to_sub_numbers(splitted_number)
                existing_words_for_splitted_number = self._list_of_sub_numbers_to_top_list_of_existing_sub_words(sub_numbers, max_number_of_sub_words)
                cache.set(self.__get_number_to_words_cache_key(splitted_number), existing_words_for_splitted_number)
            existing_words.append(existing_words_for_splitted_number)

        return existing_words

    # '731542-22-' --> '731542-22'
    @classmethod
    def sanitize_and_check_number(cls, number: str) -> str:
        # remove all whitespaces
        number = ''.join(number.split())

        # remove all leading/trailing SPLIT_CHARS
        for split_char in cls.SPLIT_CHARS:
            number = number.strip(split_char)

        # check if number contains only digits and SPLIT_CHARS
        number_without_split_chars = number
        for split_char in cls.SPLIT_CHARS:
            number_without_split_chars = number_without_split_chars.replace(split_char, '')
        if number_without_split_chars and not number_without_split_chars.isdigit():
            raise ValueError(_('The number must not contain any non-digit characters (except for split chars)!'))

        return number

    # '731542-22' --> ['73', '1', '542', '22']
    @classmethod
    def split_by_split_chars_and_split_digits(cls, number: str) -> List[str]:
        numbers_list = []

        current_sub_number = ''
        current_split_digits_sub_number = ''
        for i in range(len(number)):
            current_digit = number[i]
            if current_digit in cls.SPLIT_DIGITS:
                current_split_digits_sub_number += current_digit
                if current_sub_number:
                    numbers_list.append(current_sub_number)
                    current_sub_number = ''
            elif current_digit in cls.SPLIT_CHARS:
                if current_sub_number:
                    numbers_list.append(current_sub_number)
                    current_sub_number = ''
                if current_split_digits_sub_number:
                    numbers_list.append(current_split_digits_sub_number)
                    current_split_digits_sub_number = ''
            else:
                current_sub_number += current_digit
                if current_split_digits_sub_number:
                    numbers_list.append(current_split_digits_sub_number)
                    current_split_digits_sub_number = ''

        if current_sub_number:
            numbers_list.append(current_sub_number)
        if current_split_digits_sub_number:
            numbers_list.append(current_split_digits_sub_number)

        return numbers_list

    def _get_cost(self, splitted_numbers: List[str]) -> int:
        cost = 0
        for splitted_number in splitted_numbers:
            cost += len(splitted_number) ** 2

        return cost

    # '542' --> '542_test'
    def __get_number_to_words_cache_key(self, number: str) -> str:
        return number + '_' + str(self.__language_manager.language_name())

    # '542' --> [['542'], ['5', '42'], ['54', '2'], ['5', '4', '2']]
    def _number_to_sub_numbers(self, number: str) -> List[List[str]]:
        sub_numbers = []
        if number:
            sub_numbers.append([number])
            if number[0] not in self.__class__.SPLIT_DIGITS:
                possible_numbers_of_splitting_points = range(1, len(number))  # 1 ... (n-1)
                for number_splitting_points in possible_numbers_of_splitting_points:
                    for idxs in itertools.combinations(possible_numbers_of_splitting_points, number_splitting_points):
                        sub_numbers.append([''.join(number[i:j]) for i, j in zip((0,) + idxs, idxs + (None,))])

        return sub_numbers

    # '73' --> [
    #           'pd', 'pe', 'pf',
    #           'qd', 'qe', 'qf',
    #           'rd', 're', 'rf',
    #           'sd', 'se', 'sf'
    #          ]
    #       = {'p', 'q', 'r', 's'} x {'d', 'e', 'f'}
    def _number_to_possible_words(self, number: str) -> List[str]:
        possible_chars = []
        if number:
            if number[0] in self.__class__.SPLIT_DIGITS:
                possible_chars.append(number)
            else:
                char_sets = []
                for i in range(len(number)):
                    char_sets.append(self.__class__.DIGIT_TO_CHAR.get(number[i], [number[i]]))
                possible_chars = [''.join(item) for item in list(itertools.product(*char_sets))]

        return possible_chars

    # 're' --> true
    # 'rd' --> false
    def _word_exists(self, word: str) -> bool:
        return self.__language_manager.word_exists(word)

    # number: i.e. 542 -> ['jib', 'kia']
    # using cache: '@542_test'
    def _number_to_existing_words(self, number: str) -> List[str]:
        existing_words = cache.get(self.__get_number_to_existing_words_cache_key(number))

        if not existing_words:
            existing_words = []
            possible_words = self._number_to_possible_words(number)
            for possible_word in possible_words:
                if self._word_exists(possible_word):
                    existing_words.append(possible_word)

            if not existing_words:
                existing_words.append(number)

            cache.set(self.__get_number_to_existing_words_cache_key(number), existing_words)

        return existing_words

    # '@542_test'
    def __get_number_to_existing_words_cache_key(self, number: str) -> str:
        return '@' + number + '_' + str(self.__language_manager.language_name())

    # list_of_sub_numbers: i.e. [[542], [5, 42], [54, 2], [5, 4, 2]]
    def _list_of_sub_numbers_to_list_of_existing_sub_words(self, list_of_sub_numbers: List[List[str]]) -> List[Tuple[str]]:
        list_of_sub_words = []
        for sub_numbers in list_of_sub_numbers:
            # sub_numbers: i.e. [5, 42]
            lists_of_sub_words = []
            for sub_number in sub_numbers:
                # sub_number: i.e. 42
                lists_of_sub_words.append(self._number_to_existing_words(sub_number))

            combined_sub_words = list(itertools.product(*lists_of_sub_words))
            for combined_sub_word in combined_sub_words:
                sub_words = ()
                for sub_word in combined_sub_word:
                    if not sub_word.isdigit():
                        sub_words += (sub_word,)
                    else:
                        if sub_words and sub_words[-1].isdigit():
                            sub_words = sub_words[:-1] + (sub_words[-1] + sub_word,)
                        else:
                            sub_words += (sub_word,)

                list_of_sub_words.append(sub_words)

        return list_of_sub_words

    # The score is used for ordering the resulting possible words. Longer possible words are preferred.
    def _get_score(self, sub_words: Tuple[str]) -> int:
        score = 0
        for sub_word in sub_words:
            if not sub_word.isdigit():
                score += len(sub_word) ** 2

        return score

    # Get sorted and delimited list of the top (longest) subwords.
    def _get_top_sub_words(self, list_of_sub_words: List[Tuple[str]], max_number_of_sub_words: int=DEFAULT_NUMBER_OF_RESULTS) -> List[Tuple[str]]:
        dict_of_sub_words = {}
        for sub_words in list_of_sub_words:
            dict_of_sub_words[sub_words] = self._get_score(sub_words)

        sorted_tuple_list_of_sub_words = sorted(dict_of_sub_words.items(), key=lambda t: t[1], reverse=True)[:max_number_of_sub_words]
        sorted_list_of_sub_words = [sub_word_tuple[0] for sub_word_tuple in sorted_tuple_list_of_sub_words]

        return sorted_list_of_sub_words

    def _list_of_sub_numbers_to_top_list_of_existing_sub_words(self, list_of_sub_numbers: List[List[str]], max_number_of_sub_words: int=DEFAULT_NUMBER_OF_RESULTS) -> List[Tuple[str]]:
        list_of_existing_sub_words = self._list_of_sub_numbers_to_list_of_existing_sub_words(list_of_sub_numbers)
        top_list_of_existing_sub_words = self._get_top_sub_words(list_of_existing_sub_words, max_number_of_sub_words)
        return top_list_of_existing_sub_words
