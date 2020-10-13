# Fuchsia Templates

Fuchsia Templates is the default templating engine for FuchsiaJS, and is a optional peer dependancy with the @FuchsiaJS/core package.

Fuchsia Templates was created in an attempt to lean away from the traditional "block" style SSR templates that most Javascript based templating engines use, and instead merges HTML templates with Javascript logic and control flow.


## install

```bash

npm install @fuchsiajs/template

yarn add @fuchsiajs/template

```

## Example:

```html

<!-- 
    data : {
        title: "Fuchsia,
        list: ["Teal", "Vermillion", "Magenta"],
        message : {
            isHidden: true,
            greeting: "Hi There from Fuchsia Templates!"
        }
    }
 -->

<html>
    <head>
        <title>{{ ()=> this.title }}</title>
    </head>

    <body>
        <h1>{{ ()=> this.title }} Templates!</h1>

        <ul> 
            {{
                ()=> this.list.map(item => `<li>${item}</li>`)
            }}
        </ul>

        <div>
            {{
                ()=>{
                    if(!this.message.isHidden) {
                        return `<h2>${this.message.greeting}</h2>`
                    };
                }
            }}
        </div>

    </body>

</html>


```


## API

### its really simple!

Fuchsia Templates have a very basic API concept. Everything within `{{ .. }}` is evaluated as Javascript and what ever is returned gets converted to string and send to the server.

### theres only one gotcha!


the only "gotcha" is that you need to pass an anonymous arrow function, this is the function the templating system internals will call and the return value is what will get inserted into the HTML output.

```html
<div>
<!-- note the anonymous function!! -->
    {{ ()=> this.data }}
<div>

```

data passed to the template is automatically bound to "this" so we would refer to data object `{name: 'FuchsiaJS'}` by using `{{ ()=> this.name }}` in our template which will then evalute to `"FuchsiaJS"`



## It can be used anywhere in your template!

```html
    <!-- 
        data {
            title: "Thank You!"
            status: 'success'
            message: "that was successful!!"
        }
     -->

    <html>
        <head>
            <title>{{ ()=> this.title }}</title>
            <style>
                .success {
                    background: green;
                }
            </style>
        </head>
        <body>
         <div class="box {{ ()=> this.status }}">
            <p>{{ ()=> this.message }</p>
         </div>
        </body>
       
    </html>


```


## You can use conditional logic!

As everything inside the `{{..}}` is evaluated, anything javascript goes! If/else, for/while loops, switch, ternarys, logical &&/|| etc...

```html

<!-- 
    data {
        visible: false,
        messages : "Why, Hello There!"
    }
 -->

    <div>
        <!-- use If/Else -->

        <p>
        {{
            ()=> if(visible) return this.message.visible
        }}
        </p>

        <p>
            {{
                ()=> {
                    if(visible) {
                        return 'Teal'
                    } else {
                        return 'Vermillion'
                    }
                }
            }}
        </p>
    </div>


    <div>
    <!-- Or use ternaries -->
        <p>
        {{
            ()=> this.hidden ? 'Teal' : 'Vermillion'
        }}
        </p>
    
    </div>
```


## Dealing with data in arrays is easy! the template engine will join all the data together for you!


```html
    <!-- 
        data: {
            items: ["Teal", "Vermillion", "Magenta"]
        }
     -->

    <p>
        {{ ()=> this.items }}
    </p>

    <!-- output -->
    
    <p>TealVermillionMagenta</p>
    

```


## Want loop over DOM nodes? just map over the array and use template strings!

lets refactor the previous example!

```html
    <!-- 
        data: {
            items: ["Teal", "Vermillion", "Magenta"]
        }
     -->

    <ul>
        {{ ()=>  this.items.map(item => `<li>${item}</li>` )}}
    </ul>


    <ul>
        <li>Teal</li>
        <li>Vermillion</li>
        <li>Magenta</li>
    </ul>

   

```


## You dont have to use FuchsiaJS to use Fuchsia Templates!

here is an example using Express


```javascript
// ./src/index.js

const express = require('express')
const PORT = process.env.PORT || 8000
const app = Express();

// using app.engine to set the view engine to the fuchsiajs template renderer
// we also set the extension to use to html (we plan on using our own extension in the future!)
app.engine('html', require('@fuchsiajs/template').TemplateRenderer)

// set out directory our views are in (this is infact the default set by express)
app.set('views', process.cwd() + '/views')

// set the view engine to look at html files in our ./views folder
app.set('view engine', 'html')

app.get('/', (req, res)=>{
    // render our index file in ./views/index.html
    // pass in out data, this object will be bound to templates 'this'
    res.render('index', {title: 'FuchsiaJS', items: ['JSX on the Server!', 'Declarative Controllers and Models!', 'Awesome JS in HTML SSR Templating!']})
})

app.listen(PORT, ()=>{
    console.log('Listening on http://localhost:' + PORT)
})

```


```html
<!-- ./views/index.html -->

    <h1>{{ ()=> this.title}}</h1>
    <ul>
        {{ ()=> this.items.map(item => `<li>${item}</li>`)}}
    </ul>


<!-- Output -->
    <h1>FuchsiaJS</h1>
    <ul>
        <li>JSX on the Server!</li>
        <li>Declarative Controllers and Models!</li>
        <li>Awesome JS in HTML SSR Templating!</li>
    </ul>

```




