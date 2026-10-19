import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_news_category" AS ENUM('Admisión', 'Logros', 'Investigación', 'Comunidad', 'Avisos');
  CREATE TYPE "public"."enum_news_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__news_v_version_category" AS ENUM('Admisión', 'Logros', 'Investigación', 'Comunidad', 'Avisos');
  CREATE TYPE "public"."enum__news_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'direccion', 'comunicacion', 'admisiones', 'docente');
  CREATE TYPE "public"."enum_admission_status" AS ENUM('proximamente', 'abierta', 'cerrada', 'resultados');
  CREATE TYPE "public"."enum_site_social_name" AS ENUM('Facebook', 'Instagram', 'LinkedIn', 'YouTube');
  CREATE TABLE "news" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"date" timestamp(3) with time zone,
  	"category" "enum_news_category" DEFAULT 'Comunidad',
  	"excerpt" varchar,
  	"image_id" integer,
  	"body" jsonb,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_news_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_news_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_date" timestamp(3) with time zone,
  	"version_category" "enum__news_v_version_category" DEFAULT 'Comunidad',
  	"version_excerpt" varchar,
  	"version_image_id" integer,
  	"version_body" jsonb,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__news_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumb_url" varchar,
  	"sizes_thumb_width" numeric,
  	"sizes_thumb_height" numeric,
  	"sizes_thumb_mime_type" varchar,
  	"sizes_thumb_filesize" numeric,
  	"sizes_thumb_filename" varchar,
  	"sizes_large_url" varchar,
  	"sizes_large_width" numeric,
  	"sizes_large_height" numeric,
  	"sizes_large_mime_type" varchar,
  	"sizes_large_filesize" numeric,
  	"sizes_large_filename" varchar
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_users_role" DEFAULT 'docente' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"news_id" integer,
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "admission_key_dates" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"note" varchar
  );
  
  CREATE TABLE "admission_requirements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "admission_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "admission_score_weights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"percent" numeric NOT NULL,
  	"detail" varchar
  );
  
  CREATE TABLE "admission_paa_areas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "admission_paa_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "admission_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "admission" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"status" "enum_admission_status" NOT NULL,
  	"process_name" varchar NOT NULL,
  	"headline" varchar NOT NULL,
  	"summary" varchar NOT NULL,
  	"results_date" timestamp(3) with time zone,
  	"results_file_id" integer,
  	"results_url" varchar,
  	"practice_file_id" integer,
  	"score_note" varchar,
  	"paa_description" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "institution_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "institution_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL
  );
  
  CREATE TABLE "institution_history_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "institution_history_founders" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "institution_skills" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "institution_subject_areas_subjects" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"level" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "institution_subject_areas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE "institution_extra_programs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL
  );
  
  CREATE TABLE "institution_achievements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"year" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"institution" varchar NOT NULL
  );
  
  CREATE TABLE "institution_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"caption" varchar NOT NULL
  );
  
  CREATE TABLE "institution" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"history_founded_on" varchar NOT NULL,
  	"history_intro" varchar NOT NULL,
  	"history_founders_note" varchar,
  	"mission" varchar NOT NULL,
  	"vision" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_social" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" "enum_site_social_name" NOT NULL,
  	"handle" varchar,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "site" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"short_name" varchar NOT NULL,
  	"tagline" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"founded_year" numeric NOT NULL,
  	"phone" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"address" varchar NOT NULL,
  	"address_detail" varchar,
  	"hours" varchar NOT NULL,
  	"map_embed_url" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "news" ADD CONSTRAINT "news_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_parent_id_news_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "admission_key_dates" ADD CONSTRAINT "admission_key_dates_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."admission"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "admission_requirements" ADD CONSTRAINT "admission_requirements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."admission"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "admission_steps" ADD CONSTRAINT "admission_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."admission"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "admission_score_weights" ADD CONSTRAINT "admission_score_weights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."admission"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "admission_paa_areas" ADD CONSTRAINT "admission_paa_areas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."admission"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "admission_paa_facts" ADD CONSTRAINT "admission_paa_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."admission"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "admission_faqs" ADD CONSTRAINT "admission_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."admission"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "admission" ADD CONSTRAINT "admission_results_file_id_media_id_fk" FOREIGN KEY ("results_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "admission" ADD CONSTRAINT "admission_practice_file_id_media_id_fk" FOREIGN KEY ("practice_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "institution_stats" ADD CONSTRAINT "institution_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."institution"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "institution_pillars" ADD CONSTRAINT "institution_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."institution"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "institution_history_paragraphs" ADD CONSTRAINT "institution_history_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."institution"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "institution_history_founders" ADD CONSTRAINT "institution_history_founders_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."institution"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "institution_skills" ADD CONSTRAINT "institution_skills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."institution"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "institution_subject_areas_subjects" ADD CONSTRAINT "institution_subject_areas_subjects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."institution_subject_areas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "institution_subject_areas" ADD CONSTRAINT "institution_subject_areas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."institution"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "institution_extra_programs" ADD CONSTRAINT "institution_extra_programs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."institution"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "institution_achievements" ADD CONSTRAINT "institution_achievements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."institution"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "institution_gallery" ADD CONSTRAINT "institution_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "institution_gallery" ADD CONSTRAINT "institution_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."institution"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_social" ADD CONSTRAINT "site_social_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "news_image_idx" ON "news" USING btree ("image_id");
  CREATE UNIQUE INDEX "news_slug_idx" ON "news" USING btree ("slug");
  CREATE INDEX "news_updated_at_idx" ON "news" USING btree ("updated_at");
  CREATE INDEX "news_created_at_idx" ON "news" USING btree ("created_at");
  CREATE INDEX "news__status_idx" ON "news" USING btree ("_status");
  CREATE INDEX "_news_v_parent_idx" ON "_news_v" USING btree ("parent_id");
  CREATE INDEX "_news_v_version_version_image_idx" ON "_news_v" USING btree ("version_image_id");
  CREATE INDEX "_news_v_version_version_slug_idx" ON "_news_v" USING btree ("version_slug");
  CREATE INDEX "_news_v_version_version_updated_at_idx" ON "_news_v" USING btree ("version_updated_at");
  CREATE INDEX "_news_v_version_version_created_at_idx" ON "_news_v" USING btree ("version_created_at");
  CREATE INDEX "_news_v_version_version__status_idx" ON "_news_v" USING btree ("version__status");
  CREATE INDEX "_news_v_created_at_idx" ON "_news_v" USING btree ("created_at");
  CREATE INDEX "_news_v_updated_at_idx" ON "_news_v" USING btree ("updated_at");
  CREATE INDEX "_news_v_latest_idx" ON "_news_v" USING btree ("latest");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumb_sizes_thumb_filename_idx" ON "media" USING btree ("sizes_thumb_filename");
  CREATE INDEX "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_news_id_idx" ON "payload_locked_documents_rels" USING btree ("news_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "admission_key_dates_order_idx" ON "admission_key_dates" USING btree ("_order");
  CREATE INDEX "admission_key_dates_parent_id_idx" ON "admission_key_dates" USING btree ("_parent_id");
  CREATE INDEX "admission_requirements_order_idx" ON "admission_requirements" USING btree ("_order");
  CREATE INDEX "admission_requirements_parent_id_idx" ON "admission_requirements" USING btree ("_parent_id");
  CREATE INDEX "admission_steps_order_idx" ON "admission_steps" USING btree ("_order");
  CREATE INDEX "admission_steps_parent_id_idx" ON "admission_steps" USING btree ("_parent_id");
  CREATE INDEX "admission_score_weights_order_idx" ON "admission_score_weights" USING btree ("_order");
  CREATE INDEX "admission_score_weights_parent_id_idx" ON "admission_score_weights" USING btree ("_parent_id");
  CREATE INDEX "admission_paa_areas_order_idx" ON "admission_paa_areas" USING btree ("_order");
  CREATE INDEX "admission_paa_areas_parent_id_idx" ON "admission_paa_areas" USING btree ("_parent_id");
  CREATE INDEX "admission_paa_facts_order_idx" ON "admission_paa_facts" USING btree ("_order");
  CREATE INDEX "admission_paa_facts_parent_id_idx" ON "admission_paa_facts" USING btree ("_parent_id");
  CREATE INDEX "admission_faqs_order_idx" ON "admission_faqs" USING btree ("_order");
  CREATE INDEX "admission_faqs_parent_id_idx" ON "admission_faqs" USING btree ("_parent_id");
  CREATE INDEX "admission_results_file_idx" ON "admission" USING btree ("results_file_id");
  CREATE INDEX "admission_practice_file_idx" ON "admission" USING btree ("practice_file_id");
  CREATE INDEX "institution_stats_order_idx" ON "institution_stats" USING btree ("_order");
  CREATE INDEX "institution_stats_parent_id_idx" ON "institution_stats" USING btree ("_parent_id");
  CREATE INDEX "institution_pillars_order_idx" ON "institution_pillars" USING btree ("_order");
  CREATE INDEX "institution_pillars_parent_id_idx" ON "institution_pillars" USING btree ("_parent_id");
  CREATE INDEX "institution_history_paragraphs_order_idx" ON "institution_history_paragraphs" USING btree ("_order");
  CREATE INDEX "institution_history_paragraphs_parent_id_idx" ON "institution_history_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "institution_history_founders_order_idx" ON "institution_history_founders" USING btree ("_order");
  CREATE INDEX "institution_history_founders_parent_id_idx" ON "institution_history_founders" USING btree ("_parent_id");
  CREATE INDEX "institution_skills_order_idx" ON "institution_skills" USING btree ("_order");
  CREATE INDEX "institution_skills_parent_id_idx" ON "institution_skills" USING btree ("_parent_id");
  CREATE INDEX "institution_subject_areas_subjects_order_idx" ON "institution_subject_areas_subjects" USING btree ("_order");
  CREATE INDEX "institution_subject_areas_subjects_parent_id_idx" ON "institution_subject_areas_subjects" USING btree ("_parent_id");
  CREATE INDEX "institution_subject_areas_order_idx" ON "institution_subject_areas" USING btree ("_order");
  CREATE INDEX "institution_subject_areas_parent_id_idx" ON "institution_subject_areas" USING btree ("_parent_id");
  CREATE INDEX "institution_extra_programs_order_idx" ON "institution_extra_programs" USING btree ("_order");
  CREATE INDEX "institution_extra_programs_parent_id_idx" ON "institution_extra_programs" USING btree ("_parent_id");
  CREATE INDEX "institution_achievements_order_idx" ON "institution_achievements" USING btree ("_order");
  CREATE INDEX "institution_achievements_parent_id_idx" ON "institution_achievements" USING btree ("_parent_id");
  CREATE INDEX "institution_gallery_order_idx" ON "institution_gallery" USING btree ("_order");
  CREATE INDEX "institution_gallery_parent_id_idx" ON "institution_gallery" USING btree ("_parent_id");
  CREATE INDEX "institution_gallery_image_idx" ON "institution_gallery" USING btree ("image_id");
  CREATE INDEX "site_social_order_idx" ON "site_social" USING btree ("_order");
  CREATE INDEX "site_social_parent_id_idx" ON "site_social" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "news" CASCADE;
  DROP TABLE "_news_v" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "admission_key_dates" CASCADE;
  DROP TABLE "admission_requirements" CASCADE;
  DROP TABLE "admission_steps" CASCADE;
  DROP TABLE "admission_score_weights" CASCADE;
  DROP TABLE "admission_paa_areas" CASCADE;
  DROP TABLE "admission_paa_facts" CASCADE;
  DROP TABLE "admission_faqs" CASCADE;
  DROP TABLE "admission" CASCADE;
  DROP TABLE "institution_stats" CASCADE;
  DROP TABLE "institution_pillars" CASCADE;
  DROP TABLE "institution_history_paragraphs" CASCADE;
  DROP TABLE "institution_history_founders" CASCADE;
  DROP TABLE "institution_skills" CASCADE;
  DROP TABLE "institution_subject_areas_subjects" CASCADE;
  DROP TABLE "institution_subject_areas" CASCADE;
  DROP TABLE "institution_extra_programs" CASCADE;
  DROP TABLE "institution_achievements" CASCADE;
  DROP TABLE "institution_gallery" CASCADE;
  DROP TABLE "institution" CASCADE;
  DROP TABLE "site_social" CASCADE;
  DROP TABLE "site" CASCADE;
  DROP TYPE "public"."enum_news_category";
  DROP TYPE "public"."enum_news_status";
  DROP TYPE "public"."enum__news_v_version_category";
  DROP TYPE "public"."enum__news_v_version_status";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_admission_status";
  DROP TYPE "public"."enum_site_social_name";`)
}
