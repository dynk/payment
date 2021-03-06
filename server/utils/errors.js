class PropertyRequiredError extends Error {
  constructor(properties) {
    if(!Array.isArray(properties)){
      properties = [properties];
    }
    super(`No properties: ${  properties}`);
    this.name = 'PropertyRequiredError';
    this.property = properties;
  }
}

module.exports = {
  PropertyRequiredError
};