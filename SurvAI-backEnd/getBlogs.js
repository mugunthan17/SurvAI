
import { Client } from "@notionhq/client";
import dotenv from 'dotenv';

dotenv.config();

const notion = new Client({ auth: process.env.NOTION_API });
const database_id = process.env.DATABASE_ID;

export async function getBlogs() {
  try {
    console.log("[getBlogs] Fetching data from Notion...");

    const response = await notion.databases.query({
      database_id: database_id,
      sorts: [
        {
          property: 'ID',
          direction: 'ascending',
        }
      ],
      page_size: 100
    });

    console.log(`[getBlogs] Successfully fetched ${response.results.length} blog posts from database.`);

    const posts = response.results.map((page) => {
      const titleProperty = page.properties.title?.title;
      const title = titleProperty && titleProperty.length > 0
        ? titleProperty[0].plain_text
        : "Untitled";

      const uniqueIdProperty = page.properties['ID'];
      let uniqueIdValue = "No Unique ID Property";
      if (uniqueIdProperty && uniqueIdProperty.type === 'unique_id') {
        const prefix = uniqueIdProperty.unique_id.prefix || '';
        const number = uniqueIdProperty.unique_id.number;
        if (number !== null) {
          uniqueIdValue = `${prefix}${number}`;
        } else if (prefix) {
          uniqueIdValue = prefix;
        }
      } else if (uniqueIdProperty) {
        if (uniqueIdProperty.type === 'rich_text' && uniqueIdProperty.rich_text.length > 0) {
          uniqueIdValue = uniqueIdProperty.rich_text[0].plain_text;
        } else if (uniqueIdProperty.type === 'number' && uniqueIdProperty.number !== null) {
          uniqueIdValue = uniqueIdProperty.number.toString();
        }
      }

      const authorProperty = page.properties.author;
      let authorNames = [];
      if (authorProperty && authorProperty.type === 'people' && authorProperty.people.length > 0) {
        authorNames = authorProperty.people.map(person => person.name || person.id);
      }

      const filesProperty = page.properties.bgImg?.files;
      const imageUrl = filesProperty && filesProperty.length > 0
        ? (filesProperty[0].file?.url || filesProperty[0].external?.url)
        : null;

      const contentProperty = page.properties.content;
      let mainContent = "No Content Property Value";

      if (contentProperty && contentProperty.type === 'rich_text' && contentProperty.rich_text.length > 0) {
        mainContent = contentProperty.rich_text.map(textBlock => textBlock.plain_text).join('');
      } else if (contentProperty && contentProperty.type === 'title') {
        mainContent = contentProperty.title.map(textBlock => textBlock.plain_text).join('');
      }


      return {
        notionUniqueId: uniqueIdValue,
        title: title,
        author: authorNames.join(', '),
        imageUrl: imageUrl,
        content: mainContent
      };
    });

    return posts;

  } catch (error) {
    console.error("Failed to fetch data:", error.body || error);
    return [];
  }
}
