### WAM Project

Projekt został wykonany na potrzeby zajęć projektowych z przedmiotu "Wieloplatformowe aplikacje mobilne" na Politechnice krakowskiej.
Przedstawia planer zadań w formie aplikacji mobilnej. 

Został wykonany w technologii React-Native z wykorzystaniem implementacji JavaScript oraz otwartego środowiska do tworzenia aplikacj mobilnych Expo.

**Szczegóły techniczne:**

**Technologie:**
React Native to otwarte i wydajne środowisko do budowania aplikacji mobilnych, które wykorzystuje język JavaScript oraz składnię Reacta, umożliwiając programistom tworzenie natywnych aplikacji mobilnych dla iOS i Androida z jednego zbioru kodu.

JavaScript to wszechstronny język programowania, stosowany przede wszystkim w tworzeniu aplikacji internetowych, oferujący elastyczność, łatwość użycia oraz szeroki zakres bibliotek i frameworków, co sprawia, że jest popularnym wyborem dla programistów na różnych platformach.

Expo to kompleksowa platforma do tworzenia aplikacji mobilnych z użyciem React Native, zapewniająca łatwy start, interaktywne narzędzia deweloperskie oraz możliwość szybkiego udostępniania aplikacji na platformach iOS i Android.

**Struktura projektu:**

**App.js:**
Ten plik to główny plik aplikacji React Native, który definiuje nawigację między ekranami za pomocą react-navigation. Pierwszym ekranem jest CalendarScreen, który wyświetla kalendarz z zadaniami. Dodatkowo, na pasku nawigacyjnym tego ekranu znajduje się przycisk "Add", który pozwala użytkownikowi przejść do ekranu AddScreen, gdzie może dodać nowe zadanie do kalendarza.

Stylizacja nagłówka aplikacji została zdefiniowana w obiekcie headerOptions, który ustawia kolor tła na ciemny niebieski #302f4b i kolor tekstu na biały #fff. Dodatkowo, na ekranie CalendarScreen jest dodany przycisk do nawigacji, który umożliwia przejście do ekranu AddScreen.

Aplikacja wykorzystuje również ikony z pakietu @expo/vector-icons do dodania ikony przycisku "Add".

Projekt posiada dwa ekrany:

**Calendar.js:**
W pliku Calendar.js znajduje się funkcja CalendarScreen, która zawiera implementację kalendarza w oparciu o bibliotekę react-native. Dodatkowo, w tym pliku znajduje się również taskContainer, komponent zawierający listę zadaniami, które są importowane z pliku AddCalendar.js.

Plik Calendar.js definiuje ekran kalendarza, który umożliwia użytkownikowi przeglądanie zaplanowanych zadań na różne dni. Ekran ten wykorzystuje komponenty takie jak Calendar z biblioteki react-native-calendars do wyświetlania kalendarza oraz ScrollView do przewijania listy zadań. Dodatkowo, wykorzystuje moduł FileSystem z Expo do zapisywania i odczytywania danych dotyczących zadań z pliku JSON w lokalnym systemie plików urządzenia.

Funkcja CalendarScreen jest odpowiedzialna za zarządzanie stanem wybranego daty oraz wczytywanie i zapisywanie zadań. Ponadto, umożliwia dodawanie, edycję, usuwanie oraz oznaczanie zadań jako wykonane. Wszystkie zadania są grupowane według dni i wyświetlane na odpowiednich pozycjach w kalendarzu. Dodatkowo, użytkownik ma możliwość dodawania nowych zadań poprzez przycisk plus znajdujący się w dolnym prawym rogu ekranu.


**AddScreen.js:**
AddScreen.js eksportuje funkcję addscreen składającą się z forlumarza zawierającego 3 inputy: datę, godzinę oraz nazwę, i 2 przyciski: powrotu oraz zapisu danych.

Plik AddScreen.js definiuje ekran dodawania nowego zadania do kalendarza. Użytkownik może wprowadzić nazwę zadania, wybrać datę oraz godzinę za pomocą klawiatury lub wybierając z kalendarza i zegara. Po wypełnieniu wszystkich pól użytkownik może zapisać zadanie, co przekieruje go z powrotem do kalendarza. W przypadku braku wypełnienia wszystkich pól, użytkownik zostanie poinformowany alertem o konieczności uzupełnienia wszystkich danych. Dodatkowo, użytkownik może wrócić do kalendarza bez zapisywania nowego zadania za pomocą przycisku "Back". Stylizacja ekranu została zdefiniowana w arkuszu stylów w celu uzyskania spójnego wyglądu z resztą aplikacji.



**Funkcjonalności dodatkowe:**

Obsługa wyjątków:
W przypadku nieprzypisania którejś z trzech wartości formularza na ekranie pojawi się komunikat o niekompletności danych!


Logowanie w konsoli:
Kalendarz reaguje na wybór dnia, logując datę w konsoli.