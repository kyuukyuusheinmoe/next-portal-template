This is the Admin Portal Application with Next version 14.2.0, Daisy UI 

It includes all the basic features needed for an admin portal such as, 
1. Admin layout with 
    - Navbar, (for showing logo, notifications, profile button )
    - Sidebar (for selecting menu, flat or nested ones)
    - Main container (the container for showing information such as Dashboard, tables)

2. Table Group
    - Group of buttons (for create, export actions)
    - Group of form components such as input, calendar, dropdown (for searching the data within the table)
    - Table ifself for showing list of Data
    - The actions for each role to perform row related actions such as Update, Delete or Changing each data state

3. Export Component
    - for retrieving table data into operational form in excel format

4. Form Components
    - Consolidating form logic into one place and condionally run for each component
    - Purpose is to construct serveral forms into json and dynamically run each form through form logic using React Hook Form library
    - Validations for form using zod library

5. Network callsetup
    - Use the axios library to create a basic API call setup and use for all methods by passing Authorization and required hearders
    
6. OOP Design Pattern
    - Create a basic Service Class to be inherited from all types of services which has underground services such as Create, Update, Delete, Fetch through the API calls
    - Create each service class that extends the basic class and have some extensions with specific functions in its own
    - This pattern help avoid duplicate code for every similar functions for the servcies throughout the application
