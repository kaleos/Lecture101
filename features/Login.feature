Feature: Ecommerce validations

  Scenario: Placing the order
    Given The user logs in to the Ecommerce application with "kaleos31@gmail.com" and "sonata666"
    When Add "ADIDAS ORIGINAL" to cart
    Then The item "ADIDAS ORIGINAL" is displayed in the cart
    When Enter valid details and place the order
    Then The order is displayed in the order history