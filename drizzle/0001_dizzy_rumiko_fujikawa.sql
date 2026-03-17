CREATE TABLE "monitoring_stations" (
	"id" serial PRIMARY KEY NOT NULL,
	"external_id" text,
	"water_body_id" integer,
	"name" text NOT NULL,
	"provider" text NOT NULL,
	"station_type" text,
	"Point,4326" geometry,
	"last_sampled_at" timestamp with time zone,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pollution_sources" (
	"id" serial PRIMARY KEY NOT NULL,
	"npdes_id" text,
	"name" text NOT NULL,
	"facility_type" text,
	"status" text,
	"sector" text,
	"city" text,
	"state_code" text NOT NULL,
	"Point,4326" geometry,
	"last_discharge_at" timestamp with time zone,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "water_bodies" (
	"id" serial PRIMARY KEY NOT NULL,
	"external_id" text,
	"name" text NOT NULL,
	"water_body_type" text NOT NULL,
	"state_code" text NOT NULL,
	"huc12" text,
	"Polygon,4326" geometry,
	"Point,4326" geometry,
	"water_pulse_score" integer,
	"human_health_score" integer,
	"ecological_health_score" integer,
	"last_sampled_at" timestamp with time zone,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "monitoring_stations" ADD CONSTRAINT "monitoring_stations_water_body_id_water_bodies_id_fk" FOREIGN KEY ("water_body_id") REFERENCES "public"."water_bodies"("id") ON DELETE no action ON UPDATE no action;