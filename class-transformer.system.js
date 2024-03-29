System.register("class-transformer/ClassTransformOptions", [], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("class-transformer/metadata/ExposeExcludeOptions", [], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("class-transformer/metadata/TypeMetadata", [], function (exports_3, context_3) {
    "use strict";
    var TypeMetadata;
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
            TypeMetadata = /** @class */ (function () {
                function TypeMetadata(target, propertyName, reflectedType, typeFunction, options) {
                    this.target = target;
                    this.propertyName = propertyName;
                    this.reflectedType = reflectedType;
                    this.typeFunction = typeFunction;
                    this.options = options;
                }
                return TypeMetadata;
            }());
            exports_3("TypeMetadata", TypeMetadata);
        }
    };
});
System.register("class-transformer/metadata/ExposeMetadata", [], function (exports_4, context_4) {
    "use strict";
    var ExposeMetadata;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [],
        execute: function () {
            ExposeMetadata = /** @class */ (function () {
                function ExposeMetadata(target, propertyName, options) {
                    this.target = target;
                    this.propertyName = propertyName;
                    this.options = options;
                }
                return ExposeMetadata;
            }());
            exports_4("ExposeMetadata", ExposeMetadata);
        }
    };
});
System.register("class-transformer/metadata/ExcludeMetadata", [], function (exports_5, context_5) {
    "use strict";
    var ExcludeMetadata;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [],
        execute: function () {
            ExcludeMetadata = /** @class */ (function () {
                function ExcludeMetadata(target, propertyName, options) {
                    this.target = target;
                    this.propertyName = propertyName;
                    this.options = options;
                }
                return ExcludeMetadata;
            }());
            exports_5("ExcludeMetadata", ExcludeMetadata);
        }
    };
});
System.register("class-transformer/metadata/TransformMetadata", [], function (exports_6, context_6) {
    "use strict";
    var TransformMetadata;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [],
        execute: function () {
            TransformMetadata = /** @class */ (function () {
                function TransformMetadata(target, propertyName, transformFn, options) {
                    this.target = target;
                    this.propertyName = propertyName;
                    this.transformFn = transformFn;
                    this.options = options;
                }
                return TransformMetadata;
            }());
            exports_6("TransformMetadata", TransformMetadata);
        }
    };
});
System.register("class-transformer/metadata/MetadataStorage", ["class-transformer/TransformOperationExecutor"], function (exports_7, context_7) {
    "use strict";
    var TransformOperationExecutor_1, MetadataStorage;
    var __moduleName = context_7 && context_7.id;
    return {
        setters: [
            function (TransformOperationExecutor_1_1) {
                TransformOperationExecutor_1 = TransformOperationExecutor_1_1;
            }
        ],
        execute: function () {
            /**
             * Storage all library metadata.
             */
            MetadataStorage = /** @class */ (function () {
                function MetadataStorage() {
                    // -------------------------------------------------------------------------
                    // Properties
                    // -------------------------------------------------------------------------
                    this._typeMetadatas = new Map();
                    this._transformMetadatas = new Map();
                    this._exposeMetadatas = new Map();
                    this._excludeMetadatas = new Map();
                    this._ancestorsMap = new Map();
                }
                // -------------------------------------------------------------------------
                // Adder Methods
                // -------------------------------------------------------------------------
                MetadataStorage.prototype.addTypeMetadata = function (metadata) {
                    if (!this._typeMetadatas.has(metadata.target)) {
                        this._typeMetadatas.set(metadata.target, new Map());
                    }
                    this._typeMetadatas.get(metadata.target).set(metadata.propertyName, metadata);
                };
                MetadataStorage.prototype.addTransformMetadata = function (metadata) {
                    if (!this._transformMetadatas.has(metadata.target)) {
                        this._transformMetadatas.set(metadata.target, new Map());
                    }
                    if (!this._transformMetadatas.get(metadata.target).has(metadata.propertyName)) {
                        this._transformMetadatas.get(metadata.target).set(metadata.propertyName, []);
                    }
                    this._transformMetadatas.get(metadata.target).get(metadata.propertyName).push(metadata);
                };
                MetadataStorage.prototype.addExposeMetadata = function (metadata) {
                    if (!this._exposeMetadatas.has(metadata.target)) {
                        this._exposeMetadatas.set(metadata.target, new Map());
                    }
                    this._exposeMetadatas.get(metadata.target).set(metadata.propertyName, metadata);
                };
                MetadataStorage.prototype.addExcludeMetadata = function (metadata) {
                    if (!this._excludeMetadatas.has(metadata.target)) {
                        this._excludeMetadatas.set(metadata.target, new Map());
                    }
                    this._excludeMetadatas.get(metadata.target).set(metadata.propertyName, metadata);
                };
                // -------------------------------------------------------------------------
                // Public Methods
                // -------------------------------------------------------------------------
                MetadataStorage.prototype.findTransformMetadatas = function (target, propertyName, transformationType) {
                    return this.findMetadatas(this._transformMetadatas, target, propertyName)
                        .filter(function (metadata) {
                        if (!metadata.options)
                            return true;
                        if (metadata.options.toClassOnly === true && metadata.options.toPlainOnly === true)
                            return true;
                        if (metadata.options.toClassOnly === true) {
                            return transformationType === TransformOperationExecutor_1.TransformationType.CLASS_TO_CLASS || transformationType === TransformOperationExecutor_1.TransformationType.PLAIN_TO_CLASS;
                        }
                        if (metadata.options.toPlainOnly === true) {
                            return transformationType === TransformOperationExecutor_1.TransformationType.CLASS_TO_PLAIN;
                        }
                        return true;
                    });
                };
                MetadataStorage.prototype.findExcludeMetadata = function (target, propertyName) {
                    return this.findMetadata(this._excludeMetadatas, target, propertyName);
                };
                MetadataStorage.prototype.findExposeMetadata = function (target, propertyName) {
                    return this.findMetadata(this._exposeMetadatas, target, propertyName);
                };
                MetadataStorage.prototype.findExposeMetadataByCustomName = function (target, name) {
                    return this.getExposedMetadatas(target).find(function (metadata) {
                        return metadata.options && metadata.options.name === name;
                    });
                };
                MetadataStorage.prototype.findTypeMetadata = function (target, propertyName) {
                    return this.findMetadata(this._typeMetadatas, target, propertyName);
                };
                MetadataStorage.prototype.getStrategy = function (target) {
                    var excludeMap = this._excludeMetadatas.get(target);
                    var exclude = excludeMap && excludeMap.get(undefined);
                    var exposeMap = this._exposeMetadatas.get(target);
                    var expose = exposeMap && exposeMap.get(undefined);
                    if ((exclude && expose) || (!exclude && !expose))
                        return "none";
                    return exclude ? "excludeAll" : "exposeAll";
                };
                MetadataStorage.prototype.getExposedMetadatas = function (target) {
                    return this.getMetadata(this._exposeMetadatas, target);
                };
                MetadataStorage.prototype.getExcludedMetadatas = function (target) {
                    return this.getMetadata(this._excludeMetadatas, target);
                };
                MetadataStorage.prototype.getExposedProperties = function (target, transformationType) {
                    return this.getExposedMetadatas(target)
                        .filter(function (metadata) {
                        if (!metadata.options)
                            return true;
                        if (metadata.options.toClassOnly === true && metadata.options.toPlainOnly === true)
                            return true;
                        if (metadata.options.toClassOnly === true) {
                            return transformationType === TransformOperationExecutor_1.TransformationType.CLASS_TO_CLASS || transformationType === TransformOperationExecutor_1.TransformationType.PLAIN_TO_CLASS;
                        }
                        if (metadata.options.toPlainOnly === true) {
                            return transformationType === TransformOperationExecutor_1.TransformationType.CLASS_TO_PLAIN;
                        }
                        return true;
                    })
                        .map(function (metadata) { return metadata.propertyName; });
                };
                MetadataStorage.prototype.getExcludedProperties = function (target, transformationType) {
                    return this.getExcludedMetadatas(target)
                        .filter(function (metadata) {
                        if (!metadata.options)
                            return true;
                        if (metadata.options.toClassOnly === true && metadata.options.toPlainOnly === true)
                            return true;
                        if (metadata.options.toClassOnly === true) {
                            return transformationType === TransformOperationExecutor_1.TransformationType.CLASS_TO_CLASS || transformationType === TransformOperationExecutor_1.TransformationType.PLAIN_TO_CLASS;
                        }
                        if (metadata.options.toPlainOnly === true) {
                            return transformationType === TransformOperationExecutor_1.TransformationType.CLASS_TO_PLAIN;
                        }
                        return true;
                    })
                        .map(function (metadata) { return metadata.propertyName; });
                };
                MetadataStorage.prototype.clear = function () {
                    this._typeMetadatas.clear();
                    this._exposeMetadatas.clear();
                    this._excludeMetadatas.clear();
                    this._ancestorsMap.clear();
                };
                // -------------------------------------------------------------------------
                // Private Methods
                // -------------------------------------------------------------------------
                MetadataStorage.prototype.getMetadata = function (metadatas, target) {
                    var metadataFromTargetMap = metadatas.get(target);
                    var metadataFromTarget;
                    if (metadataFromTargetMap) {
                        metadataFromTarget = Array.from(metadataFromTargetMap.values()).filter(function (meta) { return meta.propertyName !== undefined; });
                    }
                    var metadataFromAncestors = [];
                    for (var _i = 0, _a = this.getAncestors(target); _i < _a.length; _i++) {
                        var ancestor = _a[_i];
                        var ancestorMetadataMap = metadatas.get(ancestor);
                        if (ancestorMetadataMap) {
                            var metadataFromAncestor = Array.from(ancestorMetadataMap.values()).filter(function (meta) { return meta.propertyName !== undefined; });
                            metadataFromAncestors.push.apply(metadataFromAncestors, metadataFromAncestor);
                        }
                    }
                    return metadataFromAncestors.concat(metadataFromTarget || []);
                };
                MetadataStorage.prototype.findMetadata = function (metadatas, target, propertyName) {
                    var metadataFromTargetMap = metadatas.get(target);
                    if (metadataFromTargetMap) {
                        var metadataFromTarget = metadataFromTargetMap.get(propertyName);
                        if (metadataFromTarget) {
                            return metadataFromTarget;
                        }
                    }
                    for (var _i = 0, _a = this.getAncestors(target); _i < _a.length; _i++) {
                        var ancestor = _a[_i];
                        var ancestorMetadataMap = metadatas.get(ancestor);
                        if (ancestorMetadataMap) {
                            var ancestorResult = ancestorMetadataMap.get(propertyName);
                            if (ancestorResult) {
                                return ancestorResult;
                            }
                        }
                    }
                    return undefined;
                };
                MetadataStorage.prototype.findMetadatas = function (metadatas, target, propertyName) {
                    var metadataFromTargetMap = metadatas.get(target);
                    var metadataFromTarget;
                    if (metadataFromTargetMap) {
                        metadataFromTarget = metadataFromTargetMap.get(propertyName);
                    }
                    var metadataFromAncestorsTarget = [];
                    for (var _i = 0, _a = this.getAncestors(target); _i < _a.length; _i++) {
                        var ancestor = _a[_i];
                        var ancestorMetadataMap = metadatas.get(ancestor);
                        if (ancestorMetadataMap) {
                            if (ancestorMetadataMap.has(propertyName)) {
                                metadataFromAncestorsTarget.push.apply(metadataFromAncestorsTarget, ancestorMetadataMap.get(propertyName));
                            }
                        }
                    }
                    return (metadataFromAncestorsTarget).reverse().concat((metadataFromTarget || []).reverse());
                };
                MetadataStorage.prototype.getAncestors = function (target) {
                    if (!target)
                        return [];
                    if (!this._ancestorsMap.has(target)) {
                        var ancestors = [];
                        for (var baseClass = Object.getPrototypeOf(target.prototype.constructor); typeof baseClass.prototype !== "undefined"; baseClass = Object.getPrototypeOf(baseClass.prototype.constructor)) {
                            ancestors.push(baseClass);
                        }
                        this._ancestorsMap.set(target, ancestors);
                    }
                    return this._ancestorsMap.get(target);
                };
                return MetadataStorage;
            }());
            exports_7("MetadataStorage", MetadataStorage);
        }
    };
});
System.register("class-transformer/storage", ["class-transformer/metadata/MetadataStorage"], function (exports_8, context_8) {
    "use strict";
    var MetadataStorage_1, defaultMetadataStorage;
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [
            function (MetadataStorage_1_1) {
                MetadataStorage_1 = MetadataStorage_1_1;
            }
        ],
        execute: function () {
            /**
             * Default metadata storage is used as singleton and can be used to storage all metadatas.
             */
            exports_8("defaultMetadataStorage", defaultMetadataStorage = new MetadataStorage_1.MetadataStorage());
        }
    };
});
System.register("class-transformer/TransformOperationExecutor", ["class-transformer/storage", "@typed/is-promise"], function (exports_9, context_9) {
    "use strict";
    var storage_1, is_promise_1, TransformationType, TransformOperationExecutor;
    var __moduleName = context_9 && context_9.id;
    function instantiateArrayType(arrayType) {
        var array = new arrayType();
        if (!(array instanceof Set) && !("push" in array)) {
            return [];
        }
        return array;
    }
    function testForBuffer() {
        try {
            Buffer;
            return true;
        }
        catch (_a) { }
        return false;
    }
    exports_9("testForBuffer", testForBuffer);
    return {
        setters: [
            function (storage_1_1) {
                storage_1 = storage_1_1;
            },
            function (is_promise_1_1) {
                is_promise_1 = is_promise_1_1;
            }
        ],
        execute: function () {
            (function (TransformationType) {
                TransformationType[TransformationType["PLAIN_TO_CLASS"] = 0] = "PLAIN_TO_CLASS";
                TransformationType[TransformationType["CLASS_TO_PLAIN"] = 1] = "CLASS_TO_PLAIN";
                TransformationType[TransformationType["CLASS_TO_CLASS"] = 2] = "CLASS_TO_CLASS";
            })(TransformationType || (TransformationType = {}));
            exports_9("TransformationType", TransformationType);
            TransformOperationExecutor = /** @class */ (function () {
                // -------------------------------------------------------------------------
                // Constructor
                // -------------------------------------------------------------------------
                function TransformOperationExecutor(transformationType, options) {
                    this.transformationType = transformationType;
                    this.options = options;
                    // -------------------------------------------------------------------------
                    // Private Properties
                    // -------------------------------------------------------------------------
                    this.recursionStack = new Set();
                }
                // -------------------------------------------------------------------------
                // Public Methods
                // -------------------------------------------------------------------------
                TransformOperationExecutor.prototype.transform = function (source, value, targetType, arrayType, isMap, level) {
                    var _this = this;
                    if (level === void 0) { level = 0; }
                    if (Array.isArray(value) || value instanceof Set) {
                        var newValue_1 = arrayType && this.transformationType === TransformationType.PLAIN_TO_CLASS ? instantiateArrayType(arrayType) : [];
                        value.forEach(function (subValue, index) {
                            var subSource = source ? source[index] : undefined;
                            if (!_this.options.enableCircularCheck || !_this.isCircular(subValue)) {
                                var realTargetType = void 0;
                                if (typeof targetType !== "function" && targetType && targetType.options && targetType.options.discriminator && targetType.options.discriminator.property && targetType.options.discriminator.subTypes) {
                                    if (_this.transformationType === TransformationType.PLAIN_TO_CLASS) {
                                        realTargetType = targetType.options.discriminator.subTypes.find(function (subType) { return subType.name === subValue[targetType.options.discriminator.property]; });
                                        var options = { newObject: newValue_1, object: subValue, property: undefined };
                                        var newType = targetType.typeFunction(options);
                                        realTargetType === undefined ? realTargetType = newType : realTargetType = realTargetType.value;
                                        if (!targetType.options.keepDiscriminatorProperty)
                                            delete subValue[targetType.options.discriminator.property];
                                    }
                                    if (_this.transformationType === TransformationType.CLASS_TO_CLASS) {
                                        realTargetType = subValue.constructor;
                                    }
                                    if (_this.transformationType === TransformationType.CLASS_TO_PLAIN) {
                                        subValue[targetType.options.discriminator.property] = targetType.options.discriminator.subTypes.find(function (subType) { return subType.value === subValue.constructor; }).name;
                                    }
                                }
                                else {
                                    realTargetType = targetType;
                                }
                                var value_1 = _this.transform(subSource, subValue, realTargetType, undefined, subValue instanceof Map, level + 1);
                                if (newValue_1 instanceof Set) {
                                    newValue_1.add(value_1);
                                }
                                else {
                                    newValue_1.push(value_1);
                                }
                            }
                            else if (_this.transformationType === TransformationType.CLASS_TO_CLASS) {
                                if (newValue_1 instanceof Set) {
                                    newValue_1.add(subValue);
                                }
                                else {
                                    newValue_1.push(subValue);
                                }
                            }
                        });
                        return newValue_1;
                    }
                    else if (targetType === String && !isMap) {
                        if (value === null || value === undefined)
                            return value;
                        return String(value);
                    }
                    else if (targetType === Number && !isMap) {
                        if (value === null || value === undefined)
                            return value;
                        return Number(value);
                    }
                    else if (targetType === Boolean && !isMap) {
                        if (value === null || value === undefined)
                            return value;
                        return Boolean(value);
                    }
                    else if ((targetType === Date || value instanceof Date) && !isMap) {
                        if (value instanceof Date) {
                            return new Date(value.valueOf());
                        }
                        if (value === null || value === undefined)
                            return value;
                        return new Date(value);
                    }
                    else if (testForBuffer() && (targetType === Buffer || value instanceof Buffer) && !isMap) {
                        if (value === null || value === undefined)
                            return value;
                        return Buffer.from(value);
                    }
                    else if (is_promise_1.isPromise(value) && !isMap) {
                        return new Promise(function (resolve, reject) {
                            value.then(function (data) { return resolve(_this.transform(undefined, data, targetType, undefined, undefined, level + 1)); }, reject);
                        });
                    }
                    else if (is_promise_1.isPromise(value) && !isMap) {
                        return new Promise(function (resolve, reject) {
                            value.then(function (data) { return resolve(_this.transform(undefined, data, targetType, undefined, undefined, level + 1)); }, reject);
                        });
                    }
                    else if (typeof value === "object" && value !== null) {
                        // try to guess the type
                        if (!targetType && value.constructor !== Object /* && TransformationType === TransformationType.CLASS_TO_PLAIN*/)
                            targetType = value.constructor;
                        if (!targetType && source)
                            targetType = source.constructor;
                        if (this.options.enableCircularCheck) {
                            // add transformed type to prevent circular references
                            this.recursionStack.add(value);
                        }
                        var keys = this.getKeys(targetType, value);
                        var newValue = source ? source : {};
                        if (!source && (this.transformationType === TransformationType.PLAIN_TO_CLASS || this.transformationType === TransformationType.CLASS_TO_CLASS)) {
                            if (isMap) {
                                newValue = new Map();
                            }
                            else if (targetType) {
                                newValue = new targetType();
                            }
                            else {
                                newValue = {};
                            }
                        }
                        var _loop_1 = function (key) {
                            var valueKey = key, newValueKey = key, propertyName = key;
                            if (!this_1.options.ignoreDecorators && targetType) {
                                if (this_1.transformationType === TransformationType.PLAIN_TO_CLASS) {
                                    var exposeMetadata = storage_1.defaultMetadataStorage.findExposeMetadataByCustomName(targetType, key);
                                    if (exposeMetadata) {
                                        propertyName = exposeMetadata.propertyName;
                                        newValueKey = exposeMetadata.propertyName;
                                    }
                                }
                                else if (this_1.transformationType === TransformationType.CLASS_TO_PLAIN || this_1.transformationType === TransformationType.CLASS_TO_CLASS) {
                                    var exposeMetadata = storage_1.defaultMetadataStorage.findExposeMetadata(targetType, key);
                                    if (exposeMetadata && exposeMetadata.options && exposeMetadata.options.name) {
                                        newValueKey = exposeMetadata.options.name;
                                    }
                                }
                            }
                            // get a subvalue
                            var subValue = undefined;
                            if (value instanceof Map) {
                                subValue = value.get(valueKey);
                            }
                            else if (value[valueKey] instanceof Function) {
                                subValue = value[valueKey]();
                            }
                            else {
                                subValue = value[valueKey];
                            }
                            // determine a type
                            var type = undefined, isSubValueMap = subValue instanceof Map;
                            if (targetType && isMap) {
                                type = targetType;
                            }
                            else if (targetType) {
                                var metadata_1 = storage_1.defaultMetadataStorage.findTypeMetadata(targetType, propertyName);
                                if (metadata_1) {
                                    var options = { newObject: newValue, object: value, property: propertyName };
                                    var newType = metadata_1.typeFunction ? metadata_1.typeFunction(options) : metadata_1.reflectedType;
                                    if (metadata_1.options && metadata_1.options.discriminator && metadata_1.options.discriminator.property && metadata_1.options.discriminator.subTypes) {
                                        if (!(value[valueKey] instanceof Array)) {
                                            if (this_1.transformationType === TransformationType.PLAIN_TO_CLASS) {
                                                type = metadata_1.options.discriminator.subTypes.find(function (subType) {
                                                    if (subValue && metadata_1.options.discriminator.property in subValue) {
                                                        return subType.name === subValue[metadata_1.options.discriminator.property];
                                                    }
                                                });
                                                type === undefined ? type = newType : type = type.value;
                                                if (!metadata_1.options.keepDiscriminatorProperty) {
                                                    if (subValue && metadata_1.options.discriminator.property in subValue) {
                                                        delete subValue[metadata_1.options.discriminator.property];
                                                    }
                                                }
                                            }
                                            if (this_1.transformationType === TransformationType.CLASS_TO_CLASS) {
                                                type = subValue.constructor;
                                            }
                                            if (this_1.transformationType === TransformationType.CLASS_TO_PLAIN) {
                                                subValue[metadata_1.options.discriminator.property] = metadata_1.options.discriminator.subTypes.find(function (subType) { return subType.value === subValue.constructor; }).name;
                                            }
                                        }
                                        else {
                                            type = metadata_1;
                                        }
                                    }
                                    else {
                                        type = newType;
                                    }
                                    isSubValueMap = isSubValueMap || metadata_1.reflectedType === Map;
                                }
                                else if (this_1.options.targetMaps) { // try to find a type in target maps
                                    this_1.options.targetMaps
                                        .filter(function (map) { return map.target === targetType && !!map.properties[propertyName]; })
                                        .forEach(function (map) { return type = map.properties[propertyName]; });
                                }
                                else if (this_1.options.enableImplicitConversion && this_1.transformationType === TransformationType.PLAIN_TO_CLASS) {
                                    // if we have no registererd type via the @Type() decorator then we check if we have any
                                    // type declarations in reflect-metadata (type declaration is emited only if some decorator is added to the property.)
                                    var reflectedType = Reflect.getMetadata("design:type", targetType.prototype, propertyName);
                                    if (reflectedType) {
                                        type = reflectedType;
                                    }
                                }
                            }
                            // if value is an array try to get its custom array type
                            var arrayType_1 = Array.isArray(value[valueKey]) ? this_1.getReflectedType(targetType, propertyName) : undefined;
                            // const subValueKey = TransformationType === TransformationType.PLAIN_TO_CLASS && newKeyName ? newKeyName : key;
                            var subSource = source ? source[valueKey] : undefined;
                            // if its deserialization then type if required
                            // if we uncomment this types like string[] will not work
                            // if (this.transformationType === TransformationType.PLAIN_TO_CLASS && !type && subValue instanceof Object && !(subValue instanceof Date))
                            //     throw new Error(`Cannot determine type for ${(targetType as any).name }.${propertyName}, did you forget to specify a @Type?`);
                            // if newValue is a source object that has method that match newKeyName then skip it
                            if (newValue.constructor.prototype) {
                                var descriptor = Object.getOwnPropertyDescriptor(newValue.constructor.prototype, newValueKey);
                                if ((this_1.transformationType === TransformationType.PLAIN_TO_CLASS || this_1.transformationType === TransformationType.CLASS_TO_CLASS)
                                    && ((descriptor && !descriptor.set) || newValue[newValueKey] instanceof Function)) //  || TransformationType === TransformationType.CLASS_TO_CLASS
                                    return "continue";
                            }
                            if (!this_1.options.enableCircularCheck || !this_1.isCircular(subValue)) {
                                var transformKey = this_1.transformationType === TransformationType.PLAIN_TO_CLASS ? newValueKey : key;
                                var finalValue = void 0;
                                if (this_1.transformationType === TransformationType.CLASS_TO_PLAIN) {
                                    // Get original value
                                    finalValue = value[transformKey];
                                    // Apply custom transformation
                                    finalValue = this_1.applyCustomTransformations(finalValue, targetType, transformKey, value, this_1.transformationType);
                                    // If nothing change, it means no custom transformation was applied, so use the subValue.
                                    finalValue = (value[transformKey] === finalValue) ? subValue : finalValue;
                                    // Apply the default transformation
                                    finalValue = this_1.transform(subSource, finalValue, type, arrayType_1, isSubValueMap, level + 1);
                                }
                                else {
                                    finalValue = this_1.transform(subSource, subValue, type, arrayType_1, isSubValueMap, level + 1);
                                    finalValue = this_1.applyCustomTransformations(finalValue, targetType, transformKey, value, this_1.transformationType);
                                }
                                if (newValue instanceof Map) {
                                    newValue.set(newValueKey, finalValue);
                                }
                                else {
                                    newValue[newValueKey] = finalValue;
                                }
                            }
                            else if (this_1.transformationType === TransformationType.CLASS_TO_CLASS) {
                                var finalValue = subValue;
                                finalValue = this_1.applyCustomTransformations(finalValue, targetType, key, value, this_1.transformationType);
                                if (newValue instanceof Map) {
                                    newValue.set(newValueKey, finalValue);
                                }
                                else {
                                    newValue[newValueKey] = finalValue;
                                }
                            }
                        };
                        var this_1 = this;
                        // traverse over keys
                        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                            var key = keys_1[_i];
                            _loop_1(key);
                        }
                        if (this.options.enableCircularCheck) {
                            this.recursionStack.delete(value);
                        }
                        return newValue;
                    }
                    else {
                        return value;
                    }
                };
                TransformOperationExecutor.prototype.applyCustomTransformations = function (value, target, key, obj, transformationType) {
                    var _this = this;
                    var metadatas = storage_1.defaultMetadataStorage.findTransformMetadatas(target, key, this.transformationType);
                    // apply versioning options
                    if (this.options.version !== undefined) {
                        metadatas = metadatas.filter(function (metadata) {
                            if (!metadata.options)
                                return true;
                            return _this.checkVersion(metadata.options.since, metadata.options.until);
                        });
                    }
                    // apply grouping options
                    if (this.options.groups && this.options.groups.length) {
                        metadatas = metadatas.filter(function (metadata) {
                            if (!metadata.options)
                                return true;
                            return _this.checkGroups(metadata.options.groups);
                        });
                    }
                    else {
                        metadatas = metadatas.filter(function (metadata) {
                            return !metadata.options || !metadata.options.groups || !metadata.options.groups.length;
                        });
                    }
                    metadatas.forEach(function (metadata) {
                        value = metadata.transformFn(value, obj, transformationType);
                    });
                    return value;
                };
                // preventing circular references
                TransformOperationExecutor.prototype.isCircular = function (object) {
                    return this.recursionStack.has(object);
                };
                TransformOperationExecutor.prototype.getReflectedType = function (target, propertyName) {
                    if (!target)
                        return undefined;
                    var meta = storage_1.defaultMetadataStorage.findTypeMetadata(target, propertyName);
                    return meta ? meta.reflectedType : undefined;
                };
                TransformOperationExecutor.prototype.getKeys = function (target, object) {
                    var _this = this;
                    // determine exclusion strategy
                    var strategy = storage_1.defaultMetadataStorage.getStrategy(target);
                    if (strategy === "none")
                        strategy = this.options.strategy || "exposeAll"; // exposeAll is default strategy
                    // get all keys that need to expose
                    var keys = [];
                    if (strategy === "exposeAll") {
                        if (object instanceof Map) {
                            keys = Array.from(object.keys());
                        }
                        else {
                            keys = Object.keys(object);
                        }
                    }
                    if (!this.options.ignoreDecorators && target) {
                        // add all exposed to list of keys
                        var exposedProperties = storage_1.defaultMetadataStorage.getExposedProperties(target, this.transformationType);
                        if (this.transformationType === TransformationType.PLAIN_TO_CLASS) {
                            exposedProperties = exposedProperties.map(function (key) {
                                var exposeMetadata = storage_1.defaultMetadataStorage.findExposeMetadata(target, key);
                                if (exposeMetadata && exposeMetadata.options && exposeMetadata.options.name) {
                                    return exposeMetadata.options.name;
                                }
                                return key;
                            });
                        }
                        if (this.options.excludeExtraneousValues) {
                            keys = exposedProperties;
                        }
                        else {
                            keys = keys.concat(exposedProperties);
                        }
                        // exclude excluded properties
                        var excludedProperties_1 = storage_1.defaultMetadataStorage.getExcludedProperties(target, this.transformationType);
                        if (excludedProperties_1.length > 0) {
                            keys = keys.filter(function (key) {
                                return excludedProperties_1.indexOf(key) === -1;
                            });
                        }
                        // apply versioning options
                        if (this.options.version !== undefined) {
                            keys = keys.filter(function (key) {
                                var exposeMetadata = storage_1.defaultMetadataStorage.findExposeMetadata(target, key);
                                if (!exposeMetadata || !exposeMetadata.options)
                                    return true;
                                return _this.checkVersion(exposeMetadata.options.since, exposeMetadata.options.until);
                            });
                        }
                        // apply grouping options
                        if (this.options.groups && this.options.groups.length) {
                            keys = keys.filter(function (key) {
                                var exposeMetadata = storage_1.defaultMetadataStorage.findExposeMetadata(target, key);
                                if (!exposeMetadata || !exposeMetadata.options)
                                    return true;
                                return _this.checkGroups(exposeMetadata.options.groups);
                            });
                        }
                        else {
                            keys = keys.filter(function (key) {
                                var exposeMetadata = storage_1.defaultMetadataStorage.findExposeMetadata(target, key);
                                return !exposeMetadata || !exposeMetadata.options || !exposeMetadata.options.groups || !exposeMetadata.options.groups.length;
                            });
                        }
                    }
                    // exclude prefixed properties
                    if (this.options.excludePrefixes && this.options.excludePrefixes.length) {
                        keys = keys.filter(function (key) { return _this.options.excludePrefixes.every(function (prefix) {
                            return key.substr(0, prefix.length) !== prefix;
                        }); });
                    }
                    // make sure we have unique keys
                    keys = keys.filter(function (key, index, self) {
                        return self.indexOf(key) === index;
                    });
                    return keys;
                };
                TransformOperationExecutor.prototype.checkVersion = function (since, until) {
                    var decision = true;
                    if (decision && since)
                        decision = this.options.version >= since;
                    if (decision && until)
                        decision = this.options.version < until;
                    return decision;
                };
                TransformOperationExecutor.prototype.checkGroups = function (groups) {
                    if (!groups)
                        return true;
                    return this.options.groups.some(function (optionGroup) { return groups.indexOf(optionGroup) !== -1; });
                };
                return TransformOperationExecutor;
            }());
            exports_9("TransformOperationExecutor", TransformOperationExecutor);
        }
    };
});
System.register("class-transformer/ClassTransformer", ["class-transformer/TransformOperationExecutor"], function (exports_10, context_10) {
    "use strict";
    var TransformOperationExecutor_2, ClassTransformer;
    var __moduleName = context_10 && context_10.id;
    return {
        setters: [
            function (TransformOperationExecutor_2_1) {
                TransformOperationExecutor_2 = TransformOperationExecutor_2_1;
            }
        ],
        execute: function () {
            ClassTransformer = /** @class */ (function () {
                function ClassTransformer() {
                }
                ClassTransformer.prototype.classToPlain = function (object, options) {
                    var executor = new TransformOperationExecutor_2.TransformOperationExecutor(TransformOperationExecutor_2.TransformationType.CLASS_TO_PLAIN, options || {});
                    return executor.transform(undefined, object, undefined, undefined, undefined, undefined);
                };
                ClassTransformer.prototype.classToPlainFromExist = function (object, plainObject, options) {
                    var executor = new TransformOperationExecutor_2.TransformOperationExecutor(TransformOperationExecutor_2.TransformationType.CLASS_TO_PLAIN, options || {});
                    return executor.transform(plainObject, object, undefined, undefined, undefined, undefined);
                };
                ClassTransformer.prototype.plainToClass = function (cls, plain, options) {
                    var executor = new TransformOperationExecutor_2.TransformOperationExecutor(TransformOperationExecutor_2.TransformationType.PLAIN_TO_CLASS, options || {});
                    return executor.transform(undefined, plain, cls, undefined, undefined, undefined);
                };
                ClassTransformer.prototype.plainToClassFromExist = function (clsObject, plain, options) {
                    var executor = new TransformOperationExecutor_2.TransformOperationExecutor(TransformOperationExecutor_2.TransformationType.PLAIN_TO_CLASS, options || {});
                    return executor.transform(clsObject, plain, undefined, undefined, undefined, undefined);
                };
                ClassTransformer.prototype.classToClass = function (object, options) {
                    var executor = new TransformOperationExecutor_2.TransformOperationExecutor(TransformOperationExecutor_2.TransformationType.CLASS_TO_CLASS, options || {});
                    return executor.transform(undefined, object, undefined, undefined, undefined, undefined);
                };
                ClassTransformer.prototype.classToClassFromExist = function (object, fromObject, options) {
                    var executor = new TransformOperationExecutor_2.TransformOperationExecutor(TransformOperationExecutor_2.TransformationType.CLASS_TO_CLASS, options || {});
                    return executor.transform(fromObject, object, undefined, undefined, undefined, undefined);
                };
                ClassTransformer.prototype.serialize = function (object, options) {
                    return JSON.stringify(this.classToPlain(object, options));
                };
                /**
                 * Deserializes given JSON string to a object of the given class.
                 */
                ClassTransformer.prototype.deserialize = function (cls, json, options) {
                    var jsonObject = JSON.parse(json);
                    return this.plainToClass(cls, jsonObject, options);
                };
                /**
                 * Deserializes given JSON string to an array of objects of the given class.
                 */
                ClassTransformer.prototype.deserializeArray = function (cls, json, options) {
                    var jsonObject = JSON.parse(json);
                    return this.plainToClass(cls, jsonObject, options);
                };
                return ClassTransformer;
            }());
            exports_10("ClassTransformer", ClassTransformer);
        }
    };
});
System.register("class-transformer/decorators", ["class-transformer/ClassTransformer", "class-transformer/storage", "class-transformer/metadata/TypeMetadata", "class-transformer/metadata/ExposeMetadata", "class-transformer/metadata/ExcludeMetadata", "class-transformer/metadata/TransformMetadata"], function (exports_11, context_11) {
    "use strict";
    var ClassTransformer_1, storage_2, TypeMetadata_1, ExposeMetadata_1, ExcludeMetadata_1, TransformMetadata_1;
    var __moduleName = context_11 && context_11.id;
    /**
     * Defines a custom logic for value transformation.
     */
    function Transform(transformFn, options) {
        return function (target, key) {
            var metadata = new TransformMetadata_1.TransformMetadata(target.constructor, key, transformFn, options);
            storage_2.defaultMetadataStorage.addTransformMetadata(metadata);
        };
    }
    exports_11("Transform", Transform);
    /**
     * Specifies a type of the property.
     * The given TypeFunction can return a constructor. A discriminator can be given in the options.
     */
    function Type(typeFunction, options) {
        return function (target, key) {
            var type = Reflect.getMetadata("design:type", target, key);
            var metadata = new TypeMetadata_1.TypeMetadata(target.constructor, key, type, typeFunction, options);
            storage_2.defaultMetadataStorage.addTypeMetadata(metadata);
        };
    }
    exports_11("Type", Type);
    /**
     * Marks property as included in the process of transformation. By default it includes the property for both
     * constructorToPlain and plainToConstructor transformations, however you can specify on which of transformation types
     * you want to skip this property.
     */
    function Expose(options) {
        return function (object, propertyName) {
            var metadata = new ExposeMetadata_1.ExposeMetadata(object instanceof Function ? object : object.constructor, propertyName, options || {});
            storage_2.defaultMetadataStorage.addExposeMetadata(metadata);
        };
    }
    exports_11("Expose", Expose);
    /**
     * Marks property as excluded from the process of transformation. By default it excludes the property for both
     * constructorToPlain and plainToConstructor transformations, however you can specify on which of transformation types
     * you want to skip this property.
     */
    function Exclude(options) {
        return function (object, propertyName) {
            var metadata = new ExcludeMetadata_1.ExcludeMetadata(object instanceof Function ? object : object.constructor, propertyName, options || {});
            storage_2.defaultMetadataStorage.addExcludeMetadata(metadata);
        };
    }
    exports_11("Exclude", Exclude);
    /**
     * Transform the object from class to plain object and return only with the exposed properties.
     */
    function TransformClassToPlain(params) {
        return function (target, propertyKey, descriptor) {
            var classTransformer = new ClassTransformer_1.ClassTransformer();
            var originalMethod = descriptor.value;
            descriptor.value = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var result = originalMethod.apply(this, args);
                var isPromise = !!result && (typeof result === "object" || typeof result === "function") && typeof result.then === "function";
                return isPromise ? result.then(function (data) { return classTransformer.classToPlain(data, params); }) : classTransformer.classToPlain(result, params);
            };
        };
    }
    exports_11("TransformClassToPlain", TransformClassToPlain);
    /**
     * Return the class instance only with the exposed properties.
     */
    function TransformClassToClass(params) {
        return function (target, propertyKey, descriptor) {
            var classTransformer = new ClassTransformer_1.ClassTransformer();
            var originalMethod = descriptor.value;
            descriptor.value = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var result = originalMethod.apply(this, args);
                var isPromise = !!result && (typeof result === "object" || typeof result === "function") && typeof result.then === "function";
                return isPromise ? result.then(function (data) { return classTransformer.classToClass(data, params); }) : classTransformer.classToClass(result, params);
            };
        };
    }
    exports_11("TransformClassToClass", TransformClassToClass);
    /**
     * Return the class instance only with the exposed properties.
     */
    function TransformPlainToClass(classType, params) {
        return function (target, propertyKey, descriptor) {
            var classTransformer = new ClassTransformer_1.ClassTransformer();
            var originalMethod = descriptor.value;
            descriptor.value = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var result = originalMethod.apply(this, args);
                var isPromise = !!result && (typeof result === "object" || typeof result === "function") && typeof result.then === "function";
                return isPromise ? result.then(function (data) { return classTransformer.plainToClass(classType, data, params); }) : classTransformer.plainToClass(classType, result, params);
            };
        };
    }
    exports_11("TransformPlainToClass", TransformPlainToClass);
    return {
        setters: [
            function (ClassTransformer_1_1) {
                ClassTransformer_1 = ClassTransformer_1_1;
            },
            function (storage_2_1) {
                storage_2 = storage_2_1;
            },
            function (TypeMetadata_1_1) {
                TypeMetadata_1 = TypeMetadata_1_1;
            },
            function (ExposeMetadata_1_1) {
                ExposeMetadata_1 = ExposeMetadata_1_1;
            },
            function (ExcludeMetadata_1_1) {
                ExcludeMetadata_1 = ExcludeMetadata_1_1;
            },
            function (TransformMetadata_1_1) {
                TransformMetadata_1 = TransformMetadata_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("class-transformer/index", ["class-transformer/ClassTransformer", "class-transformer/decorators"], function (exports_12, context_12) {
    "use strict";
    var ClassTransformer_2, classTransformer, TransformationType;
    var __moduleName = context_12 && context_12.id;
    function classToPlain(object, options) {
        return classTransformer.classToPlain(object, options);
    }
    exports_12("classToPlain", classToPlain);
    function classToPlainFromExist(object, plainObject, options) {
        return classTransformer.classToPlainFromExist(object, plainObject, options);
    }
    exports_12("classToPlainFromExist", classToPlainFromExist);
    function plainToClass(cls, plain, options) {
        return classTransformer.plainToClass(cls, plain, options);
    }
    exports_12("plainToClass", plainToClass);
    function plainToClassFromExist(clsObject, plain, options) {
        return classTransformer.plainToClassFromExist(clsObject, plain, options);
    }
    exports_12("plainToClassFromExist", plainToClassFromExist);
    function classToClass(object, options) {
        return classTransformer.classToClass(object, options);
    }
    exports_12("classToClass", classToClass);
    function classToClassFromExist(object, fromObject, options) {
        return classTransformer.classToClassFromExist(object, fromObject, options);
    }
    exports_12("classToClassFromExist", classToClassFromExist);
    function serialize(object, options) {
        return classTransformer.serialize(object, options);
    }
    exports_12("serialize", serialize);
    /**
     * Deserializes given JSON string to a object of the given class.
     */
    function deserialize(cls, json, options) {
        return classTransformer.deserialize(cls, json, options);
    }
    exports_12("deserialize", deserialize);
    /**
     * Deserializes given JSON string to an array of objects of the given class.
     */
    function deserializeArray(cls, json, options) {
        return classTransformer.deserializeArray(cls, json, options);
    }
    exports_12("deserializeArray", deserializeArray);
    var exportedNames_1 = {
        "classToPlain": true,
        "classToPlainFromExist": true,
        "plainToClass": true,
        "plainToClassFromExist": true,
        "classToClass": true,
        "classToClassFromExist": true,
        "serialize": true,
        "deserialize": true,
        "deserializeArray": true,
        "TransformationType": true,
        "ClassTransformer": true
    };
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default" && !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_12(exports);
    }
    return {
        setters: [
            function (ClassTransformer_2_1) {
                ClassTransformer_2 = ClassTransformer_2_1;
                exports_12({
                    "ClassTransformer": ClassTransformer_2_1["ClassTransformer"]
                });
            },
            function (decorators_1_1) {
                exportStar_1(decorators_1_1);
            }
        ],
        execute: function () {
            classTransformer = new ClassTransformer_2.ClassTransformer();
            /**
             * Enum representing the different transformation types.
             */
            (function (TransformationType) {
                TransformationType[TransformationType["PLAIN_TO_CLASS"] = 0] = "PLAIN_TO_CLASS";
                TransformationType[TransformationType["CLASS_TO_PLAIN"] = 1] = "CLASS_TO_PLAIN";
                TransformationType[TransformationType["CLASS_TO_CLASS"] = 2] = "CLASS_TO_CLASS";
            })(TransformationType || (TransformationType = {}));
            exports_12("TransformationType", TransformationType);
        }
    };
});
System.register("class-transformer", ["class-transformer/index"], function (exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    function exportStar_2(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_13(exports);
    }
    return {
        setters: [
            function (index_1_1) {
                exportStar_2(index_1_1);
            }
        ],
        execute: function () {
        }
    };
});
