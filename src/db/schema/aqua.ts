import { customType, integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

type GeometryKind = 'Point' | 'Polygon'

export const geometry = (kind: GeometryKind, srid: number = 4326) =>
  customType<{ data: unknown; driverData: unknown }>({
    dataType() {
      return 'geometry'
    },
    toDriver(value) {
      return value
    },
    fromDriver(value) {
      return value
    },
  })(`${kind},${srid}`)

export const waterBodies = pgTable('water_bodies', {
  id: serial('id').primaryKey(),
  externalId: text('external_id'),
  name: text('name').notNull(),
  waterBodyType: text('water_body_type').notNull(),
  stateCode: text('state_code').notNull(),
  huc12: text('huc12'),
  geom: geometry('Polygon'),
  centroid: geometry('Point'),
  waterPulseScore: integer('water_pulse_score'),
  humanHealthScore: integer('human_health_score'),
  ecologicalHealthScore: integer('ecological_health_score'),
  lastSampledAt: timestamp('last_sampled_at', { withTimezone: true }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const monitoringStations = pgTable('monitoring_stations', {
  id: serial('id').primaryKey(),
  externalId: text('external_id'),
  waterBodyId: integer('water_body_id').references(() => waterBodies.id),
  name: text('name').notNull(),
  provider: text('provider').notNull(),
  stationType: text('station_type'),
  geom: geometry('Point'),
  lastSampledAt: timestamp('last_sampled_at', { withTimezone: true }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const pollutionSources = pgTable('pollution_sources', {
  id: serial('id').primaryKey(),
  npdesId: text('npdes_id'),
  name: text('name').notNull(),
  facilityType: text('facility_type'),
  status: text('status'),
  sector: text('sector'),
  city: text('city'),
  stateCode: text('state_code').notNull(),
  geom: geometry('Point'),
  lastDischargeAt: timestamp('last_discharge_at', { withTimezone: true }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

