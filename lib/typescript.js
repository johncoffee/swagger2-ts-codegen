'use strict';

const atomicTypes = ['string', 'number', 'boolean', 'any'];

/**
 * Recursively converts a swagger type description into a typescript type, i.e., a model for our mustache
 * template.
 *
 * Not all type are currently supported, but they should be straightforward to add.
 *
 * @param swaggerType a swagger type definition, i.e., the right hand side of a swagger type definition.
 * @returns a recursive structure representing the type, which can be used as a template model.
 */
function convertType (swaggerType) {

  let typespec = {};

  if (swaggerType.hasOwnProperty('schema')) {
    return convertType(swaggerType.schema);
  } else if (typeof swaggerType.$ref === "string") {
    typespec.tsType = 'ref';
    typespec.target = swaggerType.$ref.substring(swaggerType.$ref.lastIndexOf('/') + 1);
  } else if (swaggerType.hasOwnProperty('enum')) {
    typespec.tsType = swaggerType.enum.map(function (str) { return JSON.stringify(str); }).join(' | ');
    typespec.isAtomic = true;
  } else if (swaggerType.type === 'string') {
    typespec.tsType = 'string';
  } else if (swaggerType.type === 'number' || swaggerType.type === 'integer') {
    typespec.tsType = 'number';
  } else if (swaggerType.type === 'boolean') {
    typespec.tsType = 'boolean';
  } else if (swaggerType.type === 'array') {
    typespec.tsType = 'array';
    typespec.elementType = convertType(swaggerType.items);
  } else if (swaggerType.type === 'object') {
    typespec.tsType = 'object';
    typespec.properties = [];

    swaggerType.properties.forEach(function (propertyType, propertyName) {
      let property = convertType(propertyType);
      property.name = propertyName;
      typespec.properties.push(property);
    });
  } else if (swaggerType.type instanceof Array) {
    typespec.tsType = swaggerType.type.join(" | ").replace('object', "Object");
    typespec.isAtomic = true;
  } else {
    // type unknown or unsupported... just map to 'any'...
    typespec.tsType = 'any';
  }

  // Since Mustache does not provide equality checks, we need to do the case distinction via explicit booleans
  typespec.isRef = typespec.tsType === 'ref';
  typespec.isObject = typespec.tsType === 'object';
  typespec.isArray = typespec.tsType === 'array';
  typespec.isAtomic = typespec.isAtomic || (atomicTypes.indexOf(typespec.tsType) > -1);

  return typespec;

}

module.exports.convertType = convertType;
