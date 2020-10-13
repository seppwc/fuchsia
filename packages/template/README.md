# Fuchsia Templates

Fuchsia Templates is the default templating engine for FuchsiaJS, and is a optional peer dependancy with the @FuchsiaJS/core package.

Fuchsia Templates was created in an attempt to lean away from the traditional "block" style SSR templates that most Javascript based templating engines use, and instead merges HTML templates with Javascript logic and control flow.

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

### it can be used anywhere in your template!

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


### you can use conditional logic!

As everything inside the `{{..}}` is evaluated, anything goes!

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


### dealing with data arrays are easy! just map over some data and return an array, the template engine will join all the data together for you!


```html
    <!-- 
        data: {
            items: ["Teal", "Vermillion", "Magenta"]
        }
     -->

    <p>
        {{ ()=> this.items.map(item => item )}}
    </p>

    <!-- output: 
    
        <p>TealVermillionMagenta</p>
    
     -->

```


### want to use conditionals and loops and add in extra DOM nodes? just use template strings!

lets refactor the previous example!

```html
    <!-- 
        data: {
            visible: true
            items: ["Teal", "Vermillion", "Magenta"]
        }
     -->

    <ul>
        {{ ()=> this.visible && this.items.map(item => `<li>${item}</li>` )}}
    </ul>

```




