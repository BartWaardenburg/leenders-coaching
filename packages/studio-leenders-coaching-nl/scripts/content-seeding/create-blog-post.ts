import { config } from 'dotenv';
import { nanoid } from 'nanoid';
import { createOrUpdateDocument } from './utils/sanity-client.js';
import type { SanityDocument } from './utils/sanity-client.js';
import { uploadImageFromUrl } from './utils/assets.js';
import type { ImageReference } from './utils/assets.js';
import { isDryRun } from './utils/page-utils.js';

// Load environment variables
config();

/**
 * Type for blog post content (Portable Text)
 */
export type PortableTextBlock = {
  _type: 'block';
  style: string;
  _key: string;
  markDefs: any[];
  children: {
    _type: 'span';
    _key: string;
    text: string;
    marks: string[];
  }[];
  level?: number;
  listItem?: string;
};

/**
 * Type for blog post document
 */
export interface BlogPost extends SanityDocument {
  _type: 'post';
  title: string;
  slug: {
    _type: 'slug';
    current: string;
  };
  excerpt: string;
  content: PortableTextBlock[];
  publishedAt: string;
  featuredImage: ImageReference;
  categories: Array<{
    _key: string;
    _type: 'reference';
    _ref: string;
  }>;
  isFeatured: boolean;
}

/**
 * Create a blog post with the given details
 * @param options - Blog post creation options
 * @returns The ID of the created blog post
 */
export const createBlogPost = async ({
  title,
  slug,
  excerpt,
  imageUrl,
  content,
  categories = [],
  isFeatured = false,
}: {
  title: string;
  slug: string;
  excerpt: string;
  imageUrl: string;
  content: PortableTextBlock[];
  categories?: string[];
  isFeatured?: boolean;
}): Promise<string> => {
  const postId = `post-${nanoid(6)}`;

  // If in dry-run mode, log what would happen and return
  if (isDryRun) {
    console.log(`🔍 DRY RUN MODE: Would upload image from: ${imageUrl}`);
    console.log(`🔍 DRY RUN MODE: Would create blog post with ID: ${postId}`);
    console.log(`  Title: ${title}`);
    console.log(`  Slug: ${slug}`);
    console.log(
      `  Excerpt: ${excerpt.substring(0, 100)}${excerpt.length > 100 ? '...' : ''}`,
    );
    console.log(
      `  Categories: ${categories.length ? categories.join(', ') : 'None'}`,
    );
    console.log(`  Featured: ${isFeatured ? 'Yes' : 'No'}`);
    console.log(`  Content: ${content.length} blocks`);
    return postId;
  }

  // Upload the featured image
  const featuredImage = await uploadImageFromUrl(imageUrl);

  // Create the blog post document
  await createOrUpdateDocument({
    _id: postId,
    _type: 'post',
    title,
    slug: {
      _type: 'slug',
      current: slug,
    },
    excerpt,
    content,
    publishedAt: new Date().toISOString(),
    featuredImage,
    categories: categories.map((category) => ({
      _key: nanoid(6),
      _type: 'reference',
      _ref: category,
    })),
    isFeatured,
  });

  console.log(`Created blog post with ID: ${postId}`);
  return postId;
};

/**
 * Helper function to create a Portable Text block
 * @param options - Block creation options
 * @returns A Portable Text block
 */
export const createTextBlock = ({
  text,
  style = 'normal',
  listItem,
  level,
}: {
  text: string;
  style?: string;
  listItem?: string;
  level?: number;
}): PortableTextBlock => {
  const block: PortableTextBlock = {
    _type: 'block',
    style,
    _key: nanoid(6),
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: nanoid(6),
        text,
        marks: [],
      },
    ],
  };

  if (listItem) {
    block.listItem = listItem;
    block.level = level || 1;
  }

  return block;
};

/**
 * Main function to create a sample blog post
 */
export const createSampleBlogPost = async (): Promise<void> => {
  try {
    console.log('🚀 Creating sample blog post...');

    // Example content in Portable Text format
    const content: PortableTextBlock[] = [
      createTextBlock({
        text: 'In deze blog post delen we enkele inzichten over hoe coaching je kan helpen om je doelen te bereiken.',
      }),
      createTextBlock({
        text: 'Wat is coaching?',
        style: 'h2',
      }),
      createTextBlock({
        text: 'Coaching is een proces waarbij een coach je begeleidt om je persoonlijke of professionele doelen te bereiken. Door middel van gerichte vragen, reflectie en actieplanning helpt een coach je om je eigen antwoorden te vinden en stappen te zetten richting je gewenste toekomst.',
      }),
      createTextBlock({
        text: 'Voordelen van coaching',
        style: 'h2',
      }),
      createTextBlock({
        text: 'Coaching biedt tal van voordelen, waaronder:',
      }),
      createTextBlock({
        text: 'Verhoogd zelfbewustzijn en zelfinzicht',
        listItem: 'bullet',
        level: 1,
      }),
      createTextBlock({
        text: 'Versterkt vertrouwen in eigen kunnen',
        listItem: 'bullet',
        level: 1,
      }),
      createTextBlock({
        text: 'Verbeterde communicatie en relaties',
        listItem: 'bullet',
        level: 1,
      }),
      createTextBlock({
        text: 'Toegenomen focus en productiviteit',
        listItem: 'bullet',
        level: 1,
      }),
    ];

    // Create a sample blog post
    await createBlogPost({
      title: 'De kracht van coaching: Hoe het je leven kan transformeren',
      slug: 'de-kracht-van-coaching',
      excerpt:
        'Ontdek hoe professionele coaching je kan helpen om obstakels te overwinnen, je doelen te bereiken en meer voldoening te vinden in je leven en werk.',
      imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
      content,
      categories: [], // No categories for now
      isFeatured: true, // Featured post
    });

    if (isDryRun) {
      console.log('✨ Dry run completed successfully!');
    } else {
      console.log('✨ Successfully created sample blog post!');
    }
  } catch (error) {
    console.error('Error creating sample blog post:', error);
    process.exit(1);
  }
};

// Run the script if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  createSampleBlogPost();
}
