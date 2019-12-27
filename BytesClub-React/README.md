# Bytes Club

## Description

This is the Internal portal where Syncfusion employees can schedule an events like technical/Non-technical(Interpersonal) with like-minded people in non-working hours. 

## SoftWare Requirements

* react js latest version 
* node.js 
* mongodb 64bit community edition. download link: `https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/`
* mongoDB compass. download link:`https://www.mongodb.com/download-center/compass`

## Adding your control dependency

Add your dependency in “package.json” file inside the dependencies.

Note: Here, '\*' Specifies that install the latest published package form the online. '\*' is recommended for Syncfusion packages.

```
"dependencies": {
        "@syncfusion/ej2-react-lists": "*"
        "@syncfusion/ej2-react-calendars": "*"
        "@syncfusion/ej2-react-layouts": "*"
        "@syncfusion/ej2-react-buttons": "*"
        "@syncfusion/ej2-react-dropdowns": "*"
},
```

## Connecting DataBase

* open mongoDB compass Application and click connect.
* clike `create DataBase` and assign Database Name as `bytsclub`  and Collection Name as `admin`.
* you can add your data by using `Add Data` button.
* run `bytsclub-nodejs`repository.

## Run your Sample Browser

To run your sample browser you can use any of the following command.

Run command `npm install` to install all dependentant packages and run  command `npm start` to run the project.

