import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_home_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "pages_terms_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"home_hero_label" varchar NOT NULL,
  	"home_hero_image_id" integer,
  	"home_hero_title" varchar NOT NULL,
  	"home_primary_button" varchar NOT NULL,
  	"home_secondary_button" varchar NOT NULL,
  	"home_school_label" varchar NOT NULL,
  	"home_school_title" varchar NOT NULL,
  	"home_school_lead" varchar,
  	"home_school_link_text" varchar,
  	"home_photos_label" varchar NOT NULL,
  	"home_photos_title" varchar NOT NULL,
  	"home_photos_link_text" varchar,
  	"home_news_label" varchar NOT NULL,
  	"home_news_title" varchar NOT NULL,
  	"home_news_link_text" varchar,
  	"admissions_dates_label" varchar NOT NULL,
  	"admissions_dates_title" varchar NOT NULL,
  	"admissions_steps_label" varchar NOT NULL,
  	"admissions_steps_title" varchar NOT NULL,
  	"admissions_requirements_label" varchar NOT NULL,
  	"admissions_requirements_title" varchar NOT NULL,
  	"admissions_requirements_lead" varchar,
  	"admissions_paa_label" varchar NOT NULL,
  	"admissions_paa_title" varchar NOT NULL,
  	"admissions_faq_label" varchar NOT NULL,
  	"admissions_faq_title" varchar NOT NULL,
  	"admissions_faq_lead" varchar,
  	"school_hero_label" varchar NOT NULL,
  	"school_hero_title" varchar NOT NULL,
  	"school_hero_lead" varchar NOT NULL,
  	"history_hero_label" varchar NOT NULL,
  	"history_hero_title" varchar NOT NULL,
  	"history_hero_lead" varchar NOT NULL,
  	"history_image_id" integer,
  	"history_origin_label" varchar NOT NULL,
  	"history_origin_title" varchar NOT NULL,
  	"history_founders_label" varchar NOT NULL,
  	"mission_vision_hero_label" varchar NOT NULL,
  	"mission_vision_hero_title" varchar NOT NULL,
  	"mission_vision_hero_lead" varchar NOT NULL,
  	"mission_vision_skills_label" varchar NOT NULL,
  	"mission_vision_skills_title" varchar NOT NULL,
  	"mission_vision_skills_lead" varchar,
  	"programs_hero_label" varchar NOT NULL,
  	"programs_hero_title" varchar NOT NULL,
  	"programs_hero_lead" varchar NOT NULL,
  	"programs_image_id" integer,
  	"programs_areas_label" varchar NOT NULL,
  	"programs_areas_title" varchar NOT NULL,
  	"programs_extra_label" varchar NOT NULL,
  	"programs_extra_title" varchar NOT NULL,
  	"programs_cta_button" varchar NOT NULL,
  	"excellence_hero_label" varchar NOT NULL,
  	"excellence_hero_title" varchar NOT NULL,
  	"excellence_hero_lead" varchar NOT NULL,
  	"excellence_research_label" varchar NOT NULL,
  	"excellence_research_title" varchar NOT NULL,
  	"excellence_research_lead" varchar,
  	"excellence_awards_label" varchar NOT NULL,
  	"excellence_awards_title" varchar NOT NULL,
  	"excellence_cta_button" varchar NOT NULL,
  	"student_life_hero_label" varchar NOT NULL,
  	"student_life_hero_title" varchar NOT NULL,
  	"student_life_hero_lead" varchar NOT NULL,
  	"news_hero_label" varchar NOT NULL,
  	"news_hero_title" varchar NOT NULL,
  	"news_hero_lead" varchar NOT NULL,
  	"contact_hero_label" varchar NOT NULL,
  	"contact_hero_title" varchar NOT NULL,
  	"contact_hero_lead" varchar NOT NULL,
  	"contact_hours_note" varchar,
  	"terms_hero_label" varchar NOT NULL,
  	"terms_hero_title" varchar NOT NULL,
  	"terms_hero_lead" varchar NOT NULL,
  	"terms_updated" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "navigation_items_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "navigation_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "navigation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pages_home_facts" ADD CONSTRAINT "pages_home_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_terms_sections" ADD CONSTRAINT "pages_terms_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_home_hero_image_id_media_id_fk" FOREIGN KEY ("home_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_history_image_id_media_id_fk" FOREIGN KEY ("history_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_programs_image_id_media_id_fk" FOREIGN KEY ("programs_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "navigation_items_children" ADD CONSTRAINT "navigation_items_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_items" ADD CONSTRAINT "navigation_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_home_facts_order_idx" ON "pages_home_facts" USING btree ("_order");
  CREATE INDEX "pages_home_facts_parent_id_idx" ON "pages_home_facts" USING btree ("_parent_id");
  CREATE INDEX "pages_terms_sections_order_idx" ON "pages_terms_sections" USING btree ("_order");
  CREATE INDEX "pages_terms_sections_parent_id_idx" ON "pages_terms_sections" USING btree ("_parent_id");
  CREATE INDEX "pages_home_home_hero_image_idx" ON "pages" USING btree ("home_hero_image_id");
  CREATE INDEX "pages_history_history_image_idx" ON "pages" USING btree ("history_image_id");
  CREATE INDEX "pages_programs_programs_image_idx" ON "pages" USING btree ("programs_image_id");
  CREATE INDEX "navigation_items_children_order_idx" ON "navigation_items_children" USING btree ("_order");
  CREATE INDEX "navigation_items_children_parent_id_idx" ON "navigation_items_children" USING btree ("_parent_id");
  CREATE INDEX "navigation_items_order_idx" ON "navigation_items" USING btree ("_order");
  CREATE INDEX "navigation_items_parent_id_idx" ON "navigation_items" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_home_facts" CASCADE;
  DROP TABLE "pages_terms_sections" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "navigation_items_children" CASCADE;
  DROP TABLE "navigation_items" CASCADE;
  DROP TABLE "navigation" CASCADE;`)
}
