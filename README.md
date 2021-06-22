# Rapaport Stone Search

Dear Candidate,
Please find below our coding exercise. You can use vanilla JavaScript or any modern frontend framework or
library.

Attached is a list of precious stones with their properties.
There are three types of stones: “Diamond”, “Sapphire”, and “Ruby”.
All three types have “Shape” and “Clarity” attributes and diamond has an additional “Color” attribute.
The possible options for each attribute are:
Shape: Round, Princess, Emerald, Asscher, Radiant, Square Radiant, Pear, Oval
Color: D, E, F, G, H, I, J, K, L, M N, O, P
Clarity: FL, IF, VVS1, VVS2, VS1, VS2, SI1, SI2, SI3, I1, I2, I3

Create a search bar (autocomplete dropdown) that will filter the list of attached stones based on the input.
Based on a user’s input the dropdown will be filled with any of the options above that start with the same string of
characters.
The options of the dropdown should also indicate which attribute and which stone type they correspond to.
For example if a user searches “E”, the dropdown will include:
Shape: Emerald in Diamond
Shape: Emerald in Sapphire
Shape: Emerald in Ruby
Color: E in Diamond
(There is no need to include the option of searching without a specified stone type)
Display the list of filtered stones based on the choice from the search bar.

Bonus:
1) Add a dropdown with stone types that will limit the list of options in the dropdown. In the above example
if the user picks “diamond” from the stone type dropdown only display the following options:
Shape: Emerald in Diamond
Color: E in Diamond

2) Add last 3 recent searches as the top options in the dropdown.
