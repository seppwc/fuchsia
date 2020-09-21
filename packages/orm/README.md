```javascript
// example query schema

// Graphql
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

// mongo

<Document name='Episode'>
  <Field name='id'>
    <ID />
  </Field>
  <Field name='name'>
    <String />
  </Field>
  <Field name='Length'>
    <Float />
  </Field>
</Document>;

const Character = () => (
  <Document name='Character'>
    <Field name='name'>
      <String />
    </Field>
    <Field name='appearsIn' array>
      <Episode />
    </Field>
  </Document>
);

//sql

<Table name='Episode'>
  <Column name='id'>
    <ID />
  </Column>
  <Column name='name'>
    <String />
  </Column>
  <Column name='Length' unit={{ lengthUnit: 'meter' }}>
    <Float />
  </Column>
</Table>;

const Character = () => (
  <Table name='Character'>
    <Column name='name'>
      <String />
    </Column>
    <Column name='appearsIn' array>
      <Episode />
    </Column>
  </Table>
);
```
