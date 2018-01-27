from django.test import TestCase

from app.core.number_to_words import NumberToWords


class NumberToWordsTestCase(TestCase):
    fixtures = ['test_words']

    def test_sanitize_and_check_number(self):
        self.assertEqual(NumberToWords.sanitize_and_check_number('1234567890'), '1234567890')
        self.assertEqual(NumberToWords.sanitize_and_check_number(''), '')
        self.assertEqual(NumberToWords.sanitize_and_check_number('  12 345 6  7890  '), '1234567890')
        self.assertEqual(NumberToWords.sanitize_and_check_number('-1234567890-'), '1234567890')
        self.assertEqual(NumberToWords.sanitize_and_check_number('- - 1234567890 - - '), '1234567890')

        self.assertEqual(NumberToWords.sanitize_and_check_number('123-456-7890'), '123-456-7890')

        self.assertEqual(NumberToWords.sanitize_and_check_number('731 542-22 -'), '731542-22')

        with self.assertRaises(ValueError):
            NumberToWords.sanitize_and_check_number('abc')

        with self.assertRaises(ValueError):
            NumberToWords.sanitize_and_check_number('123abc')

        with self.assertRaises(ValueError):
            NumberToWords.sanitize_and_check_number('1234x345678')

        with self.assertRaises(ValueError):
            NumberToWords.sanitize_and_check_number('123434+5678')

        with self.assertRaises(ValueError):
            NumberToWords.sanitize_and_check_number('7a5b')

    def test_split_by_split_chars_and_split_digits(self):
        self.assertEqual(NumberToWords.split_by_split_chars_and_split_digits(''), [])
        self.assertEqual(NumberToWords.split_by_split_chars_and_split_digits('234'), ['234'])

        self.assertEqual(NumberToWords.split_by_split_chars_and_split_digits('23-456/789'), ['23', '456', '789'])
        self.assertEqual(NumberToWords.split_by_split_chars_and_split_digits('23---456--789'), ['23', '456', '789'])

        self.assertEqual(NumberToWords.split_by_split_chars_and_split_digits('1234567890'), ['1', '23456789', '0'])
        self.assertEqual(NumberToWords.split_by_split_chars_and_split_digits('345/6718-34'), ['345', '67', '1', '8', '34'])
        self.assertEqual(NumberToWords.split_by_split_chars_and_split_digits('401484093'), ['4', '01', '484', '0', '93'])

        self.assertEqual(NumberToWords.split_by_split_chars_and_split_digits('731542-22'), ['73', '1', '542', '22'])

    def test_number_to_sub_numbers(self):
        n2w = NumberToWords('test')

        self.assertEqual(n2w._number_to_sub_numbers(''), [])

        self.assertEqual(n2w._number_to_sub_numbers('0'), [['0']])
        self.assertEqual(n2w._number_to_sub_numbers('1'), [['1']])
        self.assertEqual(n2w._number_to_sub_numbers('010'), [['010']])

        self.assertEqual(n2w._number_to_sub_numbers('2345'), [['2345'], ['2', '345'], ['23', '45'], ['234', '5'], ['2', '3', '45'], ['2', '34', '5'], ['23', '4', '5'], ['2', '3', '4', '5']])

        self.assertEqual(n2w._number_to_sub_numbers('73'), [['73'], ['7', '3']])
        self.assertEqual(n2w._number_to_sub_numbers('1'), [['1']])
        self.assertEqual(n2w._number_to_sub_numbers('542'), [['542'], ['5', '42'], ['54', '2'], ['5', '4', '2']])
        self.assertEqual(n2w._number_to_sub_numbers('22'), [['22'], ['2', '2']])

    def test_number_to_possible_words(self):
        n2w = NumberToWords('test')

        self.assertEqual(n2w._number_to_possible_words(''), [])

        self.assertEqual(n2w._number_to_possible_words('0'), ['0'])
        self.assertEqual(n2w._number_to_possible_words('1'), ['1'])
        self.assertEqual(n2w._number_to_possible_words('010'), ['010'])

        self.assertEqual(n2w._number_to_possible_words('7'), ['p', 'q', 'r', 's'])
        self.assertEqual(n2w._number_to_possible_words('23'), ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf'])
        self.assertEqual(n2w._number_to_possible_words('368'), ['dmt', 'dmu', 'dmv', 'dnt', 'dnu', 'dnv', 'dot', 'dou', 'dov', 'emt', 'emu', 'emv', 'ent', 'enu', 'env', 'eot', 'eou', 'eov', 'fmt', 'fmu', 'fmv', 'fnt', 'fnu', 'fnv', 'fot', 'fou', 'fov'])

        self.assertEqual(n2w._number_to_possible_words('73'), ['pd', 'pe', 'pf', 'qd', 'qe', 'qf', 'rd', 're', 'rf', 'sd', 'se', 'sf'])

    def test_number_to_existing_words(self):
        n2w = NumberToWords('test')

        self.assertEqual(n2w._number_to_existing_words('101'), ['101'])

        self.assertEqual(n2w._number_to_existing_words('234'), ['234'])

        self.assertEqual(n2w._number_to_existing_words('542'), ['jib', 'kia'])

    def test_list_of_sub_numbers_to_list_of_existing_sub_words(self):
        n2w = NumberToWords('test')

        self.assertEqual(n2w._list_of_sub_numbers_to_list_of_existing_sub_words([['542'], ['5', '42'], ['54', '2'], ['5', '4', '2']]), [('jib',), ('kia',), ('5', 'ga'), ('5', 'ha'), ('542',), ('542',)])

    def test_get_score(self):
        n2w = NumberToWords('test')

        self.assertEqual(n2w._get_score(('',)), 0)
        self.assertEqual(n2w._get_score(('0',)), 0)
        self.assertEqual(n2w._get_score(('1',)), 0)

        self.assertEqual(n2w._get_score(('0123', )), 0)

        self.assertEqual(n2w._get_score(('test',)), 16)
        self.assertEqual(n2w._get_score(('sie', 'er', '43')), 13)
        self.assertEqual(n2w._get_score(('12', '34', 'essen', '567')), 25)

    def test_get_top_sub_words(self):
        n2w = NumberToWords('test')

        self.assertEqual(n2w._get_top_sub_words([]), [])
        self.assertEqual(n2w._get_top_sub_words([('101',)], 5), [('101',)])
        self.assertEqual(set(n2w._get_top_sub_words([('test',), ('49249', '0948'), ('sie', 'er', '43'), ('12', '34', 'essen', '567'), ('84', '101')], 2)), {('12', '34', 'essen', '567'), ('test',)})

        self.assertEqual(set(n2w._get_top_sub_words([('jib',), ('5', 'ga'), ('542',), ('5', 'ha'), ('kia',), ('542',)], 2)), {('jib',), ('kia',)})

    def test_number_to_words(self):
        n2w = NumberToWords('test')

        self.assertEqual(n2w.number_to_words('542105-73', 2), [[('jib',), ('kia',)], [('10',)], [('5',)], [('73',)]])
