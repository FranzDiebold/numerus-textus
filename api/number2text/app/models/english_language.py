from .abstract_language_dictionary import AbstractLanguageDictionary


class EnglishLanguage(AbstractLanguageDictionary):
    class Meta:
        verbose_name = 'english word'

    @classmethod
    def name(cls) -> str:
        return 'english'
