from .abstract_language_dictionary import AbstractLanguageDictionary


class TestLanguage(AbstractLanguageDictionary):
    class Meta:
        verbose_name = 'test word'

    @classmethod
    def name(cls) -> str:
        return 'test'
