from .abstract_language_dictionary import AbstractLanguageDictionary


class GermanLanguage(AbstractLanguageDictionary):
    class Meta:
        verbose_name = 'german word'

    @classmethod
    def name(cls) -> str:
        return 'german'
