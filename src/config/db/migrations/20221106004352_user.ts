import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("user", (table: Knex.TableBuilder) => {
        table.specificType('id', 'integer PRIMARY KEY AUTO_INCREMENT');
        table.string("email").notNullable().unique();
        table.string("first_name").notNullable();
        table.string("last_name").notNullable();
        table.timestamps(true, true);
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("user");
}

