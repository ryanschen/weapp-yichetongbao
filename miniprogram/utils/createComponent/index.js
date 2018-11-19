import basic from './basic'
import observe from './observer/index';

function mapKeys(source, target, map) {
  Object.keys(map).forEach(function (key) {
    if (source[key]) {
      target[map[key]] = source[key];
    }
  });
}

export default (sourceOptions = {}) => {
  let options = {}
  mapKeys(sourceOptions, options, {
    data: 'data',
    props: 'properties',
    mixins: 'behaviors',
    methods: 'methods',
    beforeCreate: 'created',
    created: 'attached',
    mounted: 'ready',
    relations: 'relations',
    destroyed: 'detached',
    classes: 'externalClasses'
  });
  options.behaviors = options.behaviors || []
  options.behaviors.push(basic)

  options.multipleSlots = true
  options.addGlobalClass = true

  observe(sourceOptions, options);

  Component(options)
}