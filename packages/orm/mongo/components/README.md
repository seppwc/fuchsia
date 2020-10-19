```javascript
export const EpisodeModel = createModel(() => (
  <Schema name="Episode">
    <String name="name" />
    <Decimal name="length" />
  </Schema>
));
```

```javascript
const schema = Schema({
  name: {
    type: "string",
  },
  length: {
    type: "decimal",
  },
});

const EpModel = mongoose.model("Episode", schema);
```

Component Types

```javascript

() => (
    <String />
    <Number />
    <Date />
    <Buffer />
    <Boolean />
    <Mixed />
    <ObjectID />
    <Array />
    <Decimal />
    <Map />
    <Schema />
)
```

## Component props

## Document

- name: name of document

## All:

- name: name of field (FUCHSIAJS SPECIFIC PROP)

- required: boolean or function, if true adds a required validator for this property
- default: Any or function, sets a default value for the path. If the value is a function, the return value of the function is used as the default.
- select: boolean, specifies default projections for queries
- validate: function, adds a validator function for this property
- get: function, defines a custom getter for this property using Object.defineProperty().
- set: function, defines a custom setter for this property using Object.defineProperty().
- alias: string, mongoose >= 4.10.0 only. Defines a virtual with the given name that gets/sets this path.
- immutable: boolean, defines path as immutable. Mongoose prevents you from changing immutable paths unless the parent document has isNew: true.
- transform: function, Mongoose calls this function when you call Document#toJSON() function, including when you JSON.stringify() a document.

## Index props on all

- index: boolean, whether to define an index on this property.
- unique: boolean, whether to define a unique index on this property.
- sparse: boolean, whether to define a sparse index on this property.

## String

- lowercase: boolean, whether to always call .toLowerCase() on the value
- uppercase: boolean, whether to always call .toUpperCase() on the value
- trim: boolean, whether to always call .trim() on the value
- match: RegExp, creates a validator that checks if the value matches the given regular expression
- enum: Array, creates a validator that checks if the value is in the given array.
- minlength: Number, creates a validator that checks if the value length is not less than the given number
- maxlength: Number, creates a validator that checks if the value length is not greater than the given number

## Number

- min: Number, creates a validator that checks if the value is greater than or equal to the given minimum.
- max: Number, creates a validator that checks if the value is less than or equal to the given maximum.
- enum: Array, creates a validator that checks if the value is strictly equal to one of the values in the given array.

## Date

- min: Date
- max: Date

```

```
