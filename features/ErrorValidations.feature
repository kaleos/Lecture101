Feature: Ecommerce validations

  @ErrorValidation
  Scenario Outline: Placing the order
    Given The user logs in to the Ecommerce2 application with "<username>" and "<password>"
    Then Verify error message is displayed

    Examples:
      | username           | password  |
      | kaleos31@gmail.com | sonata666 |
      | hello@123.com      | Iamhello1 |
