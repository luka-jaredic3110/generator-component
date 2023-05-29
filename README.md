# generator-component

A generator for lit components

## Getting started

- npm install -g yo
- npm install -D generator-efcomponent
- npm add .yo-rc.json at the root of the project with the following contents and change the value of prefix to whatever matches your projects prefix:

{
"generator-efcomponent": { "prefix": "ef" }
}

- generate component with command: yo efcomponent my-component
- **NOTE**: my component should be the desired tag name, WITHOUT prefix. Generator will add prefix for you.
