```javascript
// example query schema

// Graphql / Mongo
const Episode = () => (
  <Object name='Episode'>
    <Field name='id'>
      <ID />
    </Field>
    <Field name='name'>
      <String />
    </Field>
    <Field name='Length' unit={{ lengthUnit: 'meter' }}>
      <Float />
    </Field>
  </Object>
);

const Character = () => (
  <Object name='Character'>
    <Field name='name'>
      <String />
    </Field>
    <Field name='appearsIn' array>
      <Episode />
    </Field>
  </Object>
);
```
