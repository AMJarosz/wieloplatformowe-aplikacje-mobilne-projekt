### WAM Project

Projekt został wykonany na potrzeby zajęć projektowych z przedmiotu "Wieloplatformowe aplikacje mobilne" na Politechnice krakowskiej.
Przedstawia planer zadań w formie aplikacji mobilnej.

Został wykonany w technologii Rect-Natice z wykorzystanem implementacji JavaScript oraz otwartego środowiska do tworzenia aplikacj mobilnych Expo.

Projekt posiada dwa ekrany:

Calendar.js eksportuje funkcję CalendarScreen, zawierającą implementację kalendarza z react-native oraz taskContainer zawierający listę z zadaniami importowanymi z AddCalendar.js.

AddScreen.js eksportuje funkcję addscreen składającą się z forlumarza zawierającego 3 inputy: datę, godzinę oraz nazwę, i 2 przyciski: powrotu oraz zapisu danych.

Funkcjonalności dodatkowe:

Obsługa wyjątków:
W przypadku nieprzypisania którejś z trzech wartości formularza na ekranie pojawi się komunikat o niekompletności danych!

Logowanie w konsoli:
Kalendarz reaguje na wybór dnia, logując datę w konsoli.
