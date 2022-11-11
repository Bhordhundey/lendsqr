import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("wallet", (table: Knex.TableBuilder) => {
        table.specificType('id', 'integer PRIMARY KEY AUTO_INCREMENT');
        table.string("wallet_ref").notNullable().unique();
        table.float("available_balance").notNullable().defaultTo(0.0);
        table.float("ledger_balance").notNullable().defaultTo(0.0);
        table.boolean("is_active").notNullable().defaultTo(true);
        table.timestamps(true, true);
        table.integer("user_id")
        .references('id')
        .inTable('user')
        .notNullable()
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("wallet");
}

