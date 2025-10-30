import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { buildConfig } from 'payload'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Posts } from './collections/post'

const isBlobEnabled = Boolean(process.env.BLOB_READ_WRITE_TOKEN)

type VercelBlobCollections = NonNullable<
  Parameters<typeof vercelBlobStorage>[0]
>['collections']

const mediaCollectionConfig: VercelBlobCollections = process.env.BLOB_MEDIA_PREFIX
  ? {
      media: {
        prefix: process.env.BLOB_MEDIA_PREFIX,
      },
    }
  : {
      media: true,
    }

export default buildConfig({
  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor(),

  // Define and configure your collections in this array
  collections: [Users, Media, Posts],

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || '',
  // Whichever Database Adapter you're using should go here
  // Mongoose is shown as an example, but you can also use Postgres
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || '',
  }),

  // Admin configuration - ensure authentication is required
  admin: {
    autoLogin: false,
  },

  // If you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  // This is optional - if you don't need to do these things,
  // you don't need it!
  sharp,

  // CORS configuration
  cors: [
    process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3001',
    'https://tsantaander-dev.vercel.app',
    'https://www.tsantaander-dev.vercel.app',
  ].filter(Boolean),

  // Server configuration
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',

  // Cookie configuration for better session handling
  cookiePrefix: 'payload',

  // Upload configuration
  upload: {
    limits: {
      fileSize: 5000000, // 5MB
    },
  },

  plugins: [
    vercelBlobStorage({
      enabled: isBlobEnabled,
      token: process.env.BLOB_READ_WRITE_TOKEN,
      collections: mediaCollectionConfig,
      clientUploads: process.env.BLOB_CLIENT_UPLOADS === 'true',
    }),
  ],
})