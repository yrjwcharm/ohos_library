/*
 * Copyright (c) 2023-2025 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @file
 * @kit ArkUI
 */

/**
 * Defines a pair of given type for particle.
 *
 * @typedef { [T1, T2] } ParticleTuple
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 18 dynamic
 */
declare type ParticleTuple<T1, T2> = [T1, T2];

/**
 * Defines velocity options.
 *
 * @typedef VelocityOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 18 dynamic
 */
declare interface VelocityOptions {
  /**
   * Particle speed.
   * @type { ParticleTuple<number, number> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Particle speed.
   * @type { ParticleTuple<number, number> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Particle speed.
   *
   * Anonymous Object Rectification.
   * @type { ParticleTuple<number, number> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  speed: ParticleTuple<number, number>;

  /**
   * Angle of particle's direction.
   * @type { ParticleTuple<number, number> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Angle of particle's direction.
   * @type { ParticleTuple<number, number> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Angle of particle's direction.
   *
   * Anonymous Object Rectification.
   * @type { ParticleTuple<number, number> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  angle: ParticleTuple<number, number>;
}

/**
 * Defines acceleration options.
 *
 * @typedef AccelerationOptions<ACC_SPEED_UPDATER extends ParticleUpdater, ACC_ANGLE_UPDATER extends ParticleUpdater>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 18 dynamic
 */
declare interface AccelerationOptions<
  ACC_SPEED_UPDATER extends ParticleUpdater,
  ACC_ANGLE_UPDATER extends ParticleUpdater
> {
  /**
   * Speed property options.
   * @type { ?ParticlePropertyOptions<number, ACC_SPEED_UPDATER> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Speed property options.
   * @type { ?ParticlePropertyOptions<number, ACC_SPEED_UPDATER> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Speed property options.
   *
   * Anonymous Object Rectification.
   * @type { ?ParticlePropertyOptions<number, ACC_SPEED_UPDATER> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  speed?: ParticlePropertyOptions<number, ACC_SPEED_UPDATER>;

  /**
   * Angle property options.
   * @type { ?ParticlePropertyOptions<number, ACC_ANGLE_UPDATER> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Angle property options.
   * @type { ?ParticlePropertyOptions<number, ACC_ANGLE_UPDATER> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Angle property options.
   *
   * Anonymous Object Rectification.
   * @type { ?ParticlePropertyOptions<number, ACC_ANGLE_UPDATER> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  angle?: ParticlePropertyOptions<number, ACC_ANGLE_UPDATER>;
}

/**
 * Defines the ParticleOptions Interface.
 * @interface ParticleOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the ParticleOptions Interface.
 * @interface ParticleOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
interface ParticleOptions<
  PARTICLE extends ParticleType,
  COLOR_UPDATER extends ParticleUpdater,
  OPACITY_UPDATER extends ParticleUpdater,
  SCALE_UPDATER extends ParticleUpdater,
  ACC_SPEED_UPDATER extends ParticleUpdater,
  ACC_ANGLE_UPDATER extends ParticleUpdater,
  SPIN_UPDATER extends ParticleUpdater
> {
  /**
   * Particle emitter.
   * @type { EmitterOptions<PARTICLE> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Particle emitter.
   * @type { EmitterOptions<PARTICLE> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  emitter: EmitterOptions<PARTICLE>;

  /**
   * Particle color.
   * @type { ?ParticleColorPropertyOptions<COLOR_UPDATER> }
   * @default {range:['#FFFFFF','#FFFFFF']}
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Particle color.
   * @type { ?ParticleColorPropertyOptions<COLOR_UPDATER> }
   * @default {range:['#FFFFFF','#FFFFFF']}
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  color?: ParticleColorPropertyOptions<COLOR_UPDATER>;

  /**
   * Particle opacity.
   * @type { ?ParticlePropertyOptions<number, OPACITY_UPDATER> }
   * @default {range:[1.0,1.0]}
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Particle opacity.
   * @type { ?ParticlePropertyOptions<number, OPACITY_UPDATER> }
   * @default {range:[1.0,1.0]}
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  opacity?: ParticlePropertyOptions<number, OPACITY_UPDATER>;

  /**
   * Particle scale.
   * @type { ?ParticlePropertyOptions<number, SCALE_UPDATER> }
   * @default {range:[1.0,1.0]}
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Particle scale.
   * @type { ?ParticlePropertyOptions<number, SCALE_UPDATER> }
   * @default {range:[1.0,1.0]}
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  scale?: ParticlePropertyOptions<number, SCALE_UPDATER>;

  /**
   * Particle velocity.
   * @type { ?object }
   * @default {speed:[0,0];angle:[0,0]}
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Particle velocity.
   * @type { ?object }
   * @default {speed:[0,0];angle:[0,0]}
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Particle velocity.
   *
   * Anonymous Object Rectification.
   * @type { ?VelocityOptions }
   * @default {speed:[0,0];angle:[0,0]}
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  velocity?: VelocityOptions;

  /**
   * Particle acceleration.
   * @type { ?object }
   * @default {speed:{range:[0,0]};angle:{range:[0,0]}}
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Particle acceleration.
   * @type { ?object }
   * @default {speed:{range:[0,0]};angle:{range:[0,0]}}
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Particle acceleration.
   *
   * Anonymous Object Rectification.
   * @type { ?AccelerationOptions<ACC_SPEED_UPDATER, ACC_ANGLE_UPDATER> }
   * @default {speed:{range:[0,0]};angle:{range:[0,0]}}
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  acceleration?: AccelerationOptions<ACC_SPEED_UPDATER, ACC_ANGLE_UPDATER>;

  /**
   * Particle spin.
   * @type { ?ParticlePropertyOptions<number, SPIN_UPDATER> }
   * @default {range:[0,0]}
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Particle spin.
   * @type { ?ParticlePropertyOptions<number, SPIN_UPDATER> }
   * @default {range:[0,0]}
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  spin?: ParticlePropertyOptions<number, SPIN_UPDATER>;
}

/**
 * Defines the parameters for a point-like particle.
 * @interface PointParticleParameters
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the parameters for a point-like particle.
 * @interface PointParticleParameters
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
interface PointParticleParameters {
  /**
   * Particle radius.
   * @type { VP }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Particle radius.
   * @type { VP }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  radius: VP;
}

/**
 * Defines the parameters for an image-like particle.
 * @interface ImageParticleParameters
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the parameters for an image-like particle.
 * @interface ImageParticleParameters
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
interface ImageParticleParameters {
  /**
   * Particle image pixelMap.
   * @type { ResourceStr }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Particle image pixelMap.
   * @type { ResourceStr }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  src: ResourceStr;

  /**
   * Particle image size.
   * @type { [Dimension, Dimension] }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Particle image size.
   * @type { [Dimension, Dimension] }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Particle image size.
   *
   * Anonymous Object Rectification.
   * @type { ParticleTuple<Dimension, Dimension> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  size: ParticleTuple<Dimension, Dimension>;

  /**
   * Image fit.
   * @type { ?ImageFit }
   * @default ImageFit.Cover
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Image fit.
   * @type { ?ImageFit }
   * @default ImageFit.Cover
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  objectFit?: ImageFit;
}

/**
 * Defines the particle configs.
 * @interface ParticleConfigs
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the particle configs.
 * @interface ParticleConfigs
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
interface ParticleConfigs {
  /**
   * Point-like Particle.
   * @type { PointParticleParameters } 
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Point-like Particle.
   * @type { PointParticleParameters } 
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  [ParticleType.POINT]: PointParticleParameters;

  /**
   * Image-like Particle.
   * @type { ImageParticleParameters } 
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Image-like Particle.
   * @type { ImageParticleParameters } 
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  [ParticleType.IMAGE]: ImageParticleParameters;
}

/**
 * Defines the emitter property.
 *
 * @interface EmitterProperty
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
interface EmitterProperty {

  /**
   * Emitter index.
   *
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  index: number;

  /**
   * Emitter emission rate.
   *
   * @type { ?number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  emitRate?: number;

  /**
   * Emitter emission rate. Only support number type.
   *
   * @type { ?PositionT<number> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  position?: PositionT<number>;

  /**
   * Emitter emission window size. Only support number type.
   *
   * @type { ?SizeT<number> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  size?: SizeT<number>;

  /**
   * the description of the annulus region. This parameter is valid only for emitter whose shape is annulus.
   *
   * @type { ?ParticleAnnulusRegion }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
   annulusRegion?: ParticleAnnulusRegion;
}

/**
 * Defines parameters of particles used by emitters.
 *
 * @typedef EmitterParticleOptions<PARTICLE extends ParticleType>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 18 dynamic
 */
interface EmitterParticleOptions<PARTICLE extends ParticleType> {
  /**
   * Particle type.
   * @type { PARTICLE }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Particle type.
   * @type { PARTICLE }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Particle type.
   *
   * Anonymous Object Rectification.
   * @type { PARTICLE }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  type: PARTICLE;
  /**
   * Particle config.
   * @type { ParticleConfigs[PARTICLE] }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Particle config.
   * @type { ParticleConfigs[PARTICLE] }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Particle config.
   *
   * Anonymous Object Rectification.
   * @type { ParticleConfigs[PARTICLE] }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  config: ParticleConfigs[PARTICLE];

  /**
   * Particle count.
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Particle count.
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Particle count.
   *
   * Anonymous Object Rectification.
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  count: number;

  /**
   * Particle lifetime.
   * @type { ?number }
   * @default 1000
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Particle lifetime.
   * @type { ?number }
   * @default 1000
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Particle lifetime.
   *
   * Anonymous Object Rectification.
   * @type { ?number }
   * @default 1000
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  lifetime?: number;

  /**
   * Particle lifetimeRange,value range [0, ∞).
   * when lifetimeRange>lifetime,minimum lifetime is 0.
   * @type { ?number }
   * @default 0
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12
   */
  /**
   * Particle lifetimeRange,value range [0, ∞).
   * when lifetimeRange>lifetime,minimum lifetime is 0.
   *
   * Anonymous Object Rectification.
   * @type { ?number }
   * @default 0
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  lifetimeRange?: number;
}

/**
 * Defines the emitter Options.
 * @interface EmitterOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the emitter Options.
 * @interface EmitterOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
interface EmitterOptions<PARTICLE extends ParticleType> {
  /**
   * Set particle config.
   * @type { object } 
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Set particle config.
   * @type { object } 
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Set particle config.
   *
   * Anonymous Object Rectification.
   * @type { EmitterParticleOptions<PARTICLE> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  particle: EmitterParticleOptions<PARTICLE>;

  /**
   * Emitting rate, that is, the number of particles produced per second.
   * @type { ?number }
   * @default 5
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Emitting rate, that is, the number of particles produced per second.
   * @type { ?number }
   * @default 5
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  emitRate?: number;

  /**
   * Shape of emitter.
   * @type { ?ParticleEmitterShape }
   * @default ParticleEmitterShape.RECTANGLE
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Shape of emitter.
   * @type { ?ParticleEmitterShape }
   * @default ParticleEmitterShape.RECTANGLE
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  shape?: ParticleEmitterShape;

  /**
   * Position of emitter.
   * The first element means X-axis location.
   * The second element means the Y-axis location.
   * @type { ?[Dimension, Dimension] }
   * @default [0,0]
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Position of emitter.
   * The first element means X-axis location.
   * The second element means the Y-axis location.
   * @type { ?[Dimension, Dimension] }
   * @default [0,0]
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Position of emitter.
   * The first element means X-axis location.
   * The second element means the Y-axis location.
   *
   * Anonymous Object Rectification.
   * @type { ?ParticleTuple<Dimension, Dimension> }
   * @default [0,0]
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  position?: ParticleTuple<Dimension, Dimension>;

  /**
   * Size of emitter.
   * The first element means emitter width.
   * The second element means emitter height.
   * @type { ?[Dimension, Dimension] }
   * @default ['100%','100%']
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Size of emitter.
   * The first element means emitter width.
   * The second element means emitter height.
   * @type { ?[Dimension, Dimension] }
   * @default ['100%','100%']
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Size of emitter.
   * The first element means emitter width.
   * The second element means emitter height.
   *
   * Anonymous Object Rectification.
   * @type { ?ParticleTuple<Dimension, Dimension> }
   * @default ['100%','100%']
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  size?: ParticleTuple<Dimension, Dimension>;

  /**
   * the description of the annulus region. This parameter is valid only for emitter whose shape is annulus.
   *
   * @type { ?ParticleAnnulusRegion }
   * @default {innerRadius:LengthMetrics.vp(0),outerRadius:LengthMetrics.vp(0)}
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  annulusRegion?: ParticleAnnulusRegion;
}

/**
 * Defines the particle property updater configs.
 * @interface ParticlePropertyUpdaterConfigs
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the particle property updater configs.
 * @interface ParticlePropertyUpdaterConfigs
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
interface ParticlePropertyUpdaterConfigs<T> {
  /**
   * No effect of particle updater.
   *
   * @type { void }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * No effect of particle updater.
   *
   * @type { void }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  [ParticleUpdater.NONE]: void;

  /**
   * Random effect of particle updater.
   * @type { [T, T] }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Random effect of particle updater.
   * @type { [T, T] }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Random effect of particle updater.
   *
   * Anonymous Object Rectification.
   * @type { ParticleTuple<T, T> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  [ParticleUpdater.RANDOM]: ParticleTuple<T, T>;

  /**
   * Curve effect of particle updater.
   * @type { Array<ParticlePropertyAnimation<T>> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Curve effect of particle updater.
   * @type { Array<ParticlePropertyAnimation<T>> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  [ParticleUpdater.CURVE]: Array<ParticlePropertyAnimation<T>>;
}

/**
 * Defines the particle updater options.
 *
 * @typedef ParticleUpdaterOptions<TYPE, UPDATER extends ParticleUpdater>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 18 dynamic
 */
interface ParticleUpdaterOptions<TYPE, UPDATER extends ParticleUpdater> {
  /**
   * Particle updater type.
   * @type { UPDATER }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Particle updater type.
   * @type { UPDATER }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Particle updater type.
   *
   * Anonymous Object Rectification.
   * @type { UPDATER }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  type: UPDATER;

  /**
   * Particle updater configuration.
   * @type { ParticlePropertyUpdaterConfigs<TYPE>[UPDATER] }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Particle updater configuration.
   * @type { ParticlePropertyUpdaterConfigs<TYPE>[UPDATER] }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Particle updater configuration.
   *
   * Anonymous Object Rectification.
   * @type { ParticlePropertyUpdaterConfigs<TYPE>[UPDATER] }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  config: ParticlePropertyUpdaterConfigs<TYPE>[UPDATER];
}

/**
 * Defines the particle color options.
 *
 * @typedef ParticleColorOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 18 dynamic
 */
interface ParticleColorOptions {
  /**
   * Red component of particle color.
   * @type { ParticleTuple<number, number> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Red component of particle color.
   * @type { ParticleTuple<number, number> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Red component of particle color.
   *
   * Anonymous Object Rectification.
   * @type { ParticleTuple<number, number> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  r: ParticleTuple<number, number>;

  /**
   * Green component of particle color.
   * @type { ParticleTuple<number, number> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Green component of particle color.
   * @type { ParticleTuple<number, number> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Green component of particle color.
   *
   * Anonymous Object Rectification.
   * @type { ParticleTuple<number, number> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  g: ParticleTuple<number, number>;

  /**
   * Blue component of particle color.
   * @type { ParticleTuple<number, number> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Blue component of particle color.
   * @type { ParticleTuple<number, number> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Blue component of particle color.
   *
   * Anonymous Object Rectification.
   * @type { ParticleTuple<number, number> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  b: ParticleTuple<number, number>;

  /**
   * Opacity component of particle color.
   * @type { ParticleTuple<number, number> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Opacity component of particle color.
   * @type { ParticleTuple<number, number> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Opacity component of particle color.
   *
   * Anonymous Object Rectification.
   * @type { ParticleTuple<number, number> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  a: ParticleTuple<number, number>;
}

/**
 * Defines the particle color updater options.
 *
 * @typedef ParticleColorUpdaterOptions<UPDATER extends ParticleUpdater>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 18 dynamic
 */
interface ParticleColorUpdaterOptions<UPDATER extends ParticleUpdater> {
  /**
   * Color updater.
   * @type { UPDATER }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Color updater.
   * @type { UPDATER }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Color updater.
   *
   * Anonymous Object Rectification.
   * @type { UPDATER }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  type: UPDATER;

  /**
   * Color updater configuration.
   * @type { ParticleColorPropertyUpdaterConfigs[UPDATER] }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Color updater configuration.
   * @type { ParticleColorPropertyUpdaterConfigs[UPDATER] }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Color updater configuration.
   *
   * Anonymous Object Rectification.
   * @type { ParticleColorPropertyUpdaterConfigs[UPDATER] }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  config: ParticleColorPropertyUpdaterConfigs[UPDATER];
}

/**
 * Defines the particle property Options.
 * @interface ParticlePropertyOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the particle property Options.
 * @interface ParticlePropertyOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
interface ParticlePropertyOptions<TYPE, UPDATER extends ParticleUpdater> {
  /**
   * Initial range, within which the initial value are randomly generated.
   * @type { [TYPE, TYPE] }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Initial range, within which the initial value are randomly generated.
   * @type { [TYPE, TYPE] }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Initial range, within which the initial value are randomly generated.
   *
   * Anonymous Object Rectification.
   * @type { ParticleTuple<TYPE, TYPE> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  range: ParticleTuple<TYPE, TYPE>;

  /**
   * Particle property updater.
   * @type { ?object }
   * @default  {type:UPDATER.NONE;config:ParticlePropertyUpdaterConfigs<UPDATER.NONE>[UPDATER.NONE]}
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Particle property updater.
   * @type { ?object }
   * @default  {type:UPDATER.NONE;config:ParticlePropertyUpdaterConfigs<UPDATER.NONE>[UPDATER.NONE]}
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Particle property updater.
   *
   * Anonymous Object Rectification.
   * @type { ?ParticleUpdaterOptions<TYPE, UPDATER> }
   * @default  {type:UPDATER.NONE;config:ParticlePropertyUpdaterConfigs<UPDATER.NONE>[UPDATER.NONE]}
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  updater?: ParticleUpdaterOptions<TYPE, UPDATER>;
}

/**
 * Defines the particle color property updater configs.
 * @interface ParticleColorPropertyUpdaterConfigs
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the particle color property updater configs.
 * @interface ParticleColorPropertyUpdaterConfigs
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
interface ParticleColorPropertyUpdaterConfigs {
  /**
   * No effect of particle color property updater.
   *
   * @type { void }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * No effect of particle color property updater.
   *
   * @type { void }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  [ParticleUpdater.NONE]: void;

  /**
   * Random effect of particle color property updater.
   * @type { object }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Random effect of particle color property updater.
   * @type { object }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Random effect of particle color property updater.
   *
   * Anonymous Object Rectification.
   * @type { ParticleColorOptions }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  [ParticleUpdater.RANDOM]: ParticleColorOptions;

  /**
   * Curve effect of particle color property updater.
   * 
   * @type { Array<ParticlePropertyAnimation<ResourceColor>> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Curve effect of particle color property updater.
   * 
   * @type { Array<ParticlePropertyAnimation<ResourceColor>> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  [ParticleUpdater.CURVE]: Array<ParticlePropertyAnimation<ResourceColor>>;
}

/**
 * Defines the particle color property updater configs which can support generics.
 * @interface ParticleColorPropertyOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the particle color property updater configs which can support generics.
 * @interface ParticleColorPropertyOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
interface ParticleColorPropertyOptions<UPDATER extends ParticleUpdater> {
  /**
   * Initial color range, within which the initial color is randomly generated.
   * @type { [ResourceColor, ResourceColor] }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Initial color range, within which the initial color is randomly generated.
   * @type { [ResourceColor, ResourceColor] }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Initial color range, within which the initial color is randomly generated.
   *
   * Anonymous Object Rectification.
   * @type { ParticleTuple<ResourceColor, ResourceColor> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  range: ParticleTuple<ResourceColor, ResourceColor>;

  /**
   * Distribution type of particle color.
   * @type { ?DistributionType }
   * @default DistributionType.UNIFORM
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  distributionType?: DistributionType;

  /**
   * Particle color property updater.
   * @type { ?object }
   * @default {type:UPDATER.NONE;config:ParticleColorPropertyUpdaterConfigs[UPDATER.NONE]}
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Particle color property updater.
   * @type { ?object }
   * @default {type:UPDATER.NONE;config:ParticleColorPropertyUpdaterConfigs[UPDATER.NONE]}
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Particle color property updater.
   *
   * Anonymous Object Rectification.
   * @type { ?ParticleColorUpdaterOptions<UPDATER> }
   * @default {type:UPDATER.NONE;config:ParticleColorPropertyUpdaterConfigs[UPDATER.NONE]}
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  updater?: ParticleColorUpdaterOptions<UPDATER>;
}

/**
 * Defines the particle property lifecycle.
 * @interface ParticlePropertyAnimation
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the particle property lifecycle.
 * @interface ParticlePropertyAnimation
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
interface ParticlePropertyAnimation<T> {
  /**
   * Start position of the particle animation. 
   * @type { T }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Start position of the particle animation. 
   * @type { T }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  from: T;

  /**
   * End position of the particle animation.
   * @type { T }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * End position of the particle animation.
   * @type { T }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  to: T;

  /**
   * Start millis of the particle animation.
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Start millis of the particle animation.
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  startMillis: number;

  /**
   * End millis of the particle animation. 
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * End millis of the particle animation. 
   * @type { number }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  endMillis: number;

  /**
   * Curve of the particle animation.
   * @type { ?(Curve | ICurve) }
   * @default Curve.Linear
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Curve of the particle animation.
   * @type { ?(Curve | ICurve) }
   * @default Curve.Linear
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  curve?: Curve | ICurve;
}

/**
 * Defines the particle array.
 *
 * @typedef Particles
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 18 dynamic
 */
interface Particles<
  PARTICLE extends ParticleType,
  COLOR_UPDATER extends ParticleUpdater,
  OPACITY_UPDATER extends ParticleUpdater,
  SCALE_UPDATER extends ParticleUpdater,
  ACC_SPEED_UPDATER extends ParticleUpdater,
  ACC_ANGLE_UPDATER extends ParticleUpdater,
  SPIN_UPDATER extends ParticleUpdater
> {
  /**
   * Array of particles.
   * @type { Array<ParticleOptions<PARTICLE, COLOR_UPDATER, OPACITY_UPDATER, SCALE_UPDATER, ACC_SPEED_UPDATER, ACC_ANGLE_UPDATER, SPIN_UPDATER>> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Array of particles.
   * @type { Array<ParticleOptions<PARTICLE, COLOR_UPDATER, OPACITY_UPDATER, SCALE_UPDATER, ACC_SPEED_UPDATER, ACC_ANGLE_UPDATER, SPIN_UPDATER>> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * Array of particles.
   *
   * Anonymous Object Rectification.
   * @type { Array<ParticleOptions<PARTICLE, COLOR_UPDATER, OPACITY_UPDATER, SCALE_UPDATER, ACC_SPEED_UPDATER, ACC_ANGLE_UPDATER, SPIN_UPDATER>> }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  particles: Array<
    ParticleOptions<
      PARTICLE,
      COLOR_UPDATER,
      OPACITY_UPDATER,
      SCALE_UPDATER,
      ACC_SPEED_UPDATER,
      ACC_ANGLE_UPDATER,
      SPIN_UPDATER
    >
  >;
}

/**
 * Defines the particle Interface.
 * @interface ParticleInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the particle Interface.
 * @interface ParticleInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 * @noninterop
 */
interface ParticleInterface {
  /**
   * create a particle array.
   * @param { object } value - Particle value
   * particles - list of ParticleOptions.
   * @returns { ParticleAttribute } Returns the particle attribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * create a particle array.
   * @param { object } value - Particle value
   * particles - list of ParticleOptions.
   * @returns { ParticleAttribute } Returns the particle attribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11
   */
  /**
   * create a particle array.
   *
   * Anonymous Object Rectification.
   * @param { Particles<PARTICLE, COLOR_UPDATER, OPACITY_UPDATER, SCALE_UPDATER, ACC_SPEED_UPDATER, ACC_ANGLE_UPDATER,
   *          SPIN_UPDATER> } particles - Array of particles.
   * @returns { ParticleAttribute } Returns the particle attribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 18 dynamic
   */
  <
    PARTICLE extends ParticleType,
    COLOR_UPDATER extends ParticleUpdater,
    OPACITY_UPDATER extends ParticleUpdater,
    SCALE_UPDATER extends ParticleUpdater,
    ACC_SPEED_UPDATER extends ParticleUpdater,
    ACC_ANGLE_UPDATER extends ParticleUpdater,
    SPIN_UPDATER extends ParticleUpdater
  >(particles: Particles<
      PARTICLE,
      COLOR_UPDATER,
      OPACITY_UPDATER,
      SCALE_UPDATER,
      ACC_SPEED_UPDATER,
      ACC_ANGLE_UPDATER,
      SPIN_UPDATER
    >): ParticleAttribute;
}

/**
 * Enumerates the particle types.
 * @enum { string }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Enumerates the particle types.
 * @enum { string }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare enum ParticleType {
  /**
   * Point-like particle.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Point-like particle.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  POINT = 'point',

  /**
   * Image-like particle.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Image-like particle.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  IMAGE = 'image'
}

/**
 * Enumerates the emitter shapes of a particle.
 * @enum { string }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Enumerates the emitter shapes of a particle.
 * @enum { string }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare enum ParticleEmitterShape {
  /**
   * Rectangle.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Rectangle.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  RECTANGLE = 'rectangle',

  /**
   * Circle.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Circle.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  CIRCLE = 'circle',

  /**
   * Ellipse.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Ellipse.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  ELLIPSE = 'ellipse',

  /**
   * Annulus.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
   ANNULUS = 'annulus'
}

/**
 * Enumerates the color distribution types of a particle.
 * 
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare enum DistributionType {
  /**
   * Uniform distribution.
   * 
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  UNIFORM = 0,

  /**
   * Gaussian distribution.
   * 
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  GAUSSIAN = 1
}

/**
 * Enumerates the updater types of a particle.
 * @enum { string }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Enumerates the updater types of a particle.
 * @enum { string }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 */
declare enum ParticleUpdater {
  /**
   * No updater is used.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * No updater is used.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  NONE = 'none',

  /**
   * Random updater.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Random updater.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  RANDOM = 'random',

  /**
   * Curve updater.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @since 10
   */
  /**
   * Curve updater.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 11 dynamic
   */
  CURVE = 'curve'
}

/**
 * Defines the SizeT type.
 *
 * @typedef { import('../../../api/arkui/Graphics').SizeT<T> }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare type SizeT<T> = import('../../../api/arkui/Graphics').SizeT<T>;

/**
 * Defines the PositionT type.
 *
 * @typedef { import('../../../api/arkui/Graphics').PositionT<T> }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare type PositionT<T> = import('../../../api/arkui/Graphics').PositionT<T>;

/**
 * Defines the Vector2T type.
 *
 * @typedef { import('../../../api/arkui/Graphics').Vector2T<T> }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 22 dynamic
 */
declare type Vector2T<T> = import('../../../api/arkui/Graphics').Vector2T<T>;

/**
 * Defines the Particle component attribute functions.
 * @extends CommonMethod<ParticleAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the Particle component attribute functions.
 * @extends CommonMethod<ParticleAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 * @noninterop
 */
declare class ParticleAttribute extends CommonMethod<ParticleAttribute> {
  /**
   * Particle disturbance Field.
   *
   * @param { Array<DisturbanceFieldOptions> } fields - particle disturbance Field params.
   * @returns { ParticleAttribute } Returns the particle attribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  disturbanceFields(fields: Array<DisturbanceFieldOptions>): ParticleAttribute;

  /**
   * Add particle animation component properties.
   *
   * @param { Array<EmitterProperty> } value - The emitter property.
   * @returns { ParticleAttribute } Returns the particle attribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  emitter(value: Array<EmitterProperty>): ParticleAttribute;

  /**
   * Set ripple fields of particles. The ripple field applies a force that varies in a wave-like pattern to particles
   * within its influence range, creating an effect similar to the spreading of ripples.
   *
   * @param { Array<RippleFieldOptions> | undefined } fields - The infomation of ripple fields.
   * @returns { ParticleAttribute } Returns the particle attribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 22 dynamic
   */
  rippleFields(fields: Array<RippleFieldOptions> | undefined): ParticleAttribute;

  /**
   * Set velocity fields of particles. The velocity field applies a force to particles within its influence range,
   * causing the particles to superimpose the specified velocity of the field onto their original velocity. 
   *
   * @param { Array<VelocityFieldOptions> | undefined } fields - The infomation of velocity fields.
   * @returns { ParticleAttribute } Returns the particle attribute.
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 22 dynamic
   */
  velocityFields(fields: Array<VelocityFieldOptions> | undefined): ParticleAttribute;
}

/**
 * Defines Particle Component.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines Particle Component.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11 dynamic
 * @noninterop
 */
declare const Particle: ParticleInterface;

/**
 * Defines particle disturbance Field params.
 * @interface DisturbanceFieldOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare interface DisturbanceFieldOptions {

  /**
   * Strength of the repulsive force from the center outward,
   * with positive numbers indicating outward repulsion and negative numbers indicating
   * inward attraction.
   *
   * @type { ?number }
   * @default 0
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  strength?: number;

  /**
   * Disturbance filed shape.
   *
   * @type { ?DisturbanceFieldShape }
   * @default DisturbanceFieldShape.RECT
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  shape?: DisturbanceFieldShape;

  /**
   * Disturbance filed size width value width, height.
   *
   * @type { ?SizeT<number> }
   * @default {width:0,height:0}
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  size?: SizeT<number>;

  /**
   * Disturbance filed position width value x, y.
   *
   * @type { ?PositionT<number> }
   * @default {x:0,y:0}
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  position?: PositionT<number>;

  /**
   * Attenuation degree of the field from the center point to the field boundary.
   * ranging from 0 to 100 integers. If 0, it indicates that the field is a rigid body,
   * and all particles within the range will be excluded.
   * a larger feather value indicates a greater degree of relaxation in the field,
   * and more particles near the center point will appear in the field strength range. The default value is 0.
   *
   * @type { ?number }
   * @default 0
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  feather?: number;

  /**
   * Scaling parameter is used to control the overall size of noise, with a value greater or equal 0.
   *
   * @type { ?number }
   * @default 1
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  noiseScale?: number;

  /**
   * Noise frequency with a value greater or equal 0.
   *
   * @type { ?number }
   * @default 1
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  noiseFrequency?: number;

  /**
   * NoiseAmplitude fluctuation range of noise,  value,
   *
   * @type { ?number }
   * @default 1
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  noiseAmplitude?: number;
}

/**
 * Defines particle disturbance shape.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12 dynamic
 */
declare enum DisturbanceFieldShape {

  /**
   * Shape rect.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  RECT = 0,

  /**
   * Shape circle.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  CIRCLE = 1,

  /**
   * Shape eclipse.
   *
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @crossplatform
   * @atomicservice
   * @since 12 dynamic
   */
  ELLIPSE = 2

}

/**
 * Defines particle annuslus region params.
 * 
 * @interface ParticleAnnulusRegion
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @stagemodelonly
 * @crossplatform
 * @atomicservice
 * @since 20 dynamic
 */
declare interface ParticleAnnulusRegion {
  /**
   * The coordinates of the center of the annulus
   *
   * @type { ?PositionT<LengthMetrics> }
   * @default {x:LengthMetrics.percent(0.5),y:LengthMetrics.percent(0.5)}
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  center?: PositionT<LengthMetrics>;
  /**
   * The outer radius of the annulus
   *
   * @type { LengthMetrics }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  outerRadius: LengthMetrics;
  /**
   * The inner radius of the annulus
   *
   * @type { LengthMetrics }
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  innerRadius: LengthMetrics;
  /**
   * The start angle of the annulus, in degree
   *
   * @type { ?number }
   * @default 0
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  startAngle?: number;
  /**
   * The end angle of the annulus, in degree
   *
   * @type { ?number }
   * @default 360
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @atomicservice
   * @since 20 dynamic
   */
  endAngle?: number;
}

/**
 * Defines particle field region params.
 * 
 * @interface FieldRegion
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @stagemodelonly
 * @crossplatform
 * @atomicservice
 * @since 22 dynamic
 */
declare interface FieldRegion {
  /**
   * The shape of the field
   *
   * @type { ?DisturbanceFieldShape }
   * @default DisturbanceFieldShape.RECT
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @atomicservice
   * @since 22 dynamic
   */
  shape?: DisturbanceFieldShape;
  /**
   * The coordinates of the center position of the field. The top-left corner of the component is the origin of the
   * coordinate system. The coordinate unit is vp.
   *
   * @type { ?PositionT<number> }
   * @default {x:0,y:0}
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @atomicservice
   * @since 22 dynamic
   */
  position?: PositionT<number>;
  /**
   * The size of the field. The unit of value is vp.
   *
   * @type { ?SizeT<number> }
   * @default {width:0,height:0}
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @atomicservice
   * @since 22 dynamic
   */
  size?: SizeT<number>;
}

/**
 * Defines ripple field options.
 * 
 * @interface RippleFieldOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @stagemodelonly
 * @crossplatform
 * @atomicservice
 * @since 22 dynamic
 */
declare interface RippleFieldOptions {
  /**
   * The amplitude of the ripple field. The greater the amplitude, the stronger the force of the ripple field.
   * Range of values:[0, +∞)
   *
   * @type { ?number }
   * @default 0
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @atomicservice
   * @since 22 dynamic
   */
  amplitude?: number;
  /**
   * Wavelength, which is the distance over which a wave cycle changes. The larger
   * the wavelength, the slower the wave changes with distance, and the less pronounced the wave fluctiations.
   * Range of values:[0, +∞)
   *
   * @type { ?number }
   * @default 0
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @atomicservice
   * @since 22 dynamic
   */
  wavelength?: number;
  /**
   * Wave speed. The greater the wave speed, the faster the wave changes over time, and the more pronounced the wave
   * motion. Range of values:[0, +∞)
   *
   * @type { ?number }
   * @default 0
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @atomicservice
   * @since 22 dynamic
   */
  waveSpeed?: number;
  /**
   * The attenuation coefficient of the ripple field. The larger the attenuation coefficient, the faster the wave
   * attenuates over time. Range of values:[0,1]
   *
   * @type { ?number }
   * @default 0
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @atomicservice
   * @since 22 dynamic
   */
  attenuation?: number;
  /**
   * The central point where the ripple field generates force. The top-left corner of the component is the origin of
   * coordinates. The coordinate unit is vp.
   *
   * @type { ?PositionT<number> }
   * @default {x:0,y:0}
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @atomicservice
   * @since 22 dynamic
   */
  center?: PositionT<number>;
  /**
   * The region influenced by the ripple field.
   *
   * @type { ?FieldRegion }
   * @default {shape:DisturbanceFieldShape.RECT,position:{x:0,y:0},size:{width:0,height:0}}
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @atomicservice
   * @since 22 dynamic
   */
  region?: FieldRegion;
}

/**
 * Defines velocity field options.
 * 
 * @interface VelocityFieldOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @stagemodelonly
 * @crossplatform
 * @atomicservice
 * @since 22 dynamic
 */
declare interface VelocityFieldOptions {
  /**
   * The velocity values in each direction of the velocity field. Particles only acquire this velocity when within
   * the range of the velocity field; once they leave the range of the velocity field, they are no longer influenced
   * by it and do not gain this additional velocity.
   *
   * @type { ?Vector2T<number> }
   * @default {x:0,y:0}
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @atomicservice
   * @since 22 dynamic
   */
  velocity?: Vector2T<number>;
  /**
   * The region influenced by the velocity field.
   *
   * @type { ?FieldRegion }
   * @default {shape:DisturbanceFieldShape.RECT,position:{x:0,y:0},size:{width:0,height:0}}
   * @syscap SystemCapability.ArkUI.ArkUI.Full
   * @stagemodelonly
   * @crossplatform
   * @atomicservice
   * @since 22 dynamic
   */
  region?: FieldRegion;
}
