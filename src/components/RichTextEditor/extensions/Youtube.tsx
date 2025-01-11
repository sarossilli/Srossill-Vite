import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer, NodeViewProps, NodeViewWrapper } from '@tiptap/react'
import React from 'react'

interface YoutubeOptions {
  addPasteHandler: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  HTMLAttributes: Record<string, any>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    youtube: {
      setYoutube: (options: { src: string }) => ReturnType
    }
  }
}

interface YoutubeAttributes {
  src: string
}

const YoutubeComponent = ({ node }: NodeViewProps) => {
    const { src } = node.attrs as YoutubeAttributes
    
    return (
      <NodeViewWrapper className="react-component-youtube-wrapper">
        <div contentEditable={false} className="youtube-embed my-4">
          <div className="w-full aspect-video">
            <iframe
              src={src}
              frameBorder="0"
              allowFullScreen
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        </div>
      </NodeViewWrapper>
    )
  }

const YoutubeExtension = Node.create<YoutubeOptions>({
  name: 'youtube',
  group: 'block',
  atom: true,
  draggable: true,

  addOptions() {
    return {
      addPasteHandler: true,
      HTMLAttributes: {},
    }
  },

  addAttributes() {
    return {
      src: {
        default: null,
        parseHTML: element => {
          const src = element.getAttribute('src')
          if (!src) return null

          return getEmbedUrl(src)
        },
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-youtube-video]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-youtube-video': '',
      }),
    ]
  },

  addNodeView() {
    return ReactNodeViewRenderer(YoutubeComponent)
  },

  addCommands() {
    return {
      setYoutube:
        options =>
        ({ commands }) => {
          const embedUrl = getEmbedUrl(options.src)
          if (!embedUrl) return false

          return commands.insertContent({
            type: this.name,
            attrs: {
              src: embedUrl,
            },
          })
        },
    }
  },

  addPasteRules() {
    if (!this.options.addPasteHandler) {
      return []
    }

    return [
      {
        find: /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/g,
        handler: ({ match }) => {
          const [, videoId] = match
          const embedUrl = getEmbedUrl(`https://youtube.com/watch?v=${videoId}`)
          if (embedUrl) {
            this.editor.commands.setYoutube({ src: embedUrl })
          }
        },
      },
    ]
  },
})

function getEmbedUrl(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ]

  let videoId: string | null = null

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) {
      videoId = match[1]
      break
    }
  }

  if (!videoId) return null

  return `https://www.youtube.com/embed/${videoId}`
}

export const Youtube = YoutubeExtension