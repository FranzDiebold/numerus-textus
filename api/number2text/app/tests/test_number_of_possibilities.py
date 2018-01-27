from django.test import TestCase

from app.core.number_of_possibilities import NumberOfPossibilities


class NumberOfPossibilitiesTestCase(TestCase):
    def test_number_of_possibilities(self):
        self.assertEqual(NumberOfPossibilities.get_number_of_possibilities(''), 0)

        self.assertEqual(NumberOfPossibilities.get_number_of_possibilities('0'), 1)
        self.assertEqual(NumberOfPossibilities.get_number_of_possibilities('1'), 1)

        self.assertEqual(NumberOfPossibilities.get_number_of_possibilities('2'), 3)
        self.assertEqual(NumberOfPossibilities.get_number_of_possibilities('7'), 4)

        self.assertEqual(NumberOfPossibilities.get_number_of_possibilities('23'), 18)
        self.assertEqual(NumberOfPossibilities.get_number_of_possibilities('435'), 108)
        self.assertEqual(NumberOfPossibilities.get_number_of_possibilities('478'), 144)
        self.assertEqual(NumberOfPossibilities.get_number_of_possibilities('487'), 144)

    def test_number_of_possibilities_with_split_chars(self):
        self.assertEqual(NumberOfPossibilities.get_number_of_possibilities('2-3'), 9)
        self.assertEqual(NumberOfPossibilities.get_number_of_possibilities('4-35'), 54)
        self.assertEqual(NumberOfPossibilities.get_number_of_possibilities('4-3-5'), 27)
