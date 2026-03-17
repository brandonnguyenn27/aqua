export type GeoJsonPoint = {
  type: 'Point'
  coordinates: [number, number]
}

export type GeoJsonBBox = [number, number, number, number]

export interface WaterBodySummary {
  id: number | string
  name: string
  waterBodyType: string
  stateCode: string
  waterPulseScore: number | null
  humanHealthScore: number | null
  ecologicalHealthScore: number | null
  centroid: GeoJsonPoint | null
  bbox?: GeoJsonBBox
}

export interface ContaminantMetric {
  code: string
  name: string
  unit: string
  value: number | null
  trend?: 'improving' | 'stable' | 'worsening' | 'unknown'
}

export interface WaterBodyDetail extends WaterBodySummary {
  lastSampledAt: string | null
  contaminants: ContaminantMetric[]
  humanHealthNarrative?: string
  ecologicalHealthNarrative?: string
}

export interface MonitoringStation {
  id: number | string
  externalId: string | null
  waterBodyId: number | string | null
  name: string
  provider: string
  stationType?: string | null
  location: GeoJsonPoint
  lastSampledAt: string | null
}

export interface PollutionSource {
  id: number | string
  npdesId: string | null
  name: string
  facilityType?: string | null
  status?: string | null
  sector?: string | null
  city?: string | null
  stateCode: string
  location: GeoJsonPoint
  lastDischargeAt: string | null
}

export interface Bounds {
  west: number
  south: number
  east: number
  north: number
}

export interface WaterBodyFilter {
  stateCode?: string
  minScore?: number
}

export interface NearbyPollutionSourceParams {
  waterBodyId?: number | string
  location?: GeoJsonPoint
  radiusMiles: number
}

export interface WaterDataAdapter {
  getWaterBodiesByBounds(
    bounds: Bounds,
    filters?: WaterBodyFilter,
  ): Promise<WaterBodySummary[]>

  getWaterBodyById(id: number | string): Promise<WaterBodyDetail | null>

  getNearbyPollutionSources(
    params: NearbyPollutionSourceParams,
  ): Promise<PollutionSource[]>

  getMonitoringStationsForWaterBody(
    id: number | string,
  ): Promise<MonitoringStation[]>
}

