'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import {
  Message,
  MessageContent,
  MessageResponse,
  MessageActions,
  MessageAction,
} from '@/components/ai-elements/message';
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
  ConversationEmptyState,
} from '@/components/ai-elements/conversation';
import {
  PromptInput,
  PromptInputBody,
  PromptInputTextarea,
  PromptInputSubmit,
  PromptInputFooter,
  type PromptInputMessage,
} from '@/components/ai-elements/prompt-input';
import { Bot, User, CopyIcon, RefreshCcwIcon, SparklesIcon } from 'lucide-react';

export default function AgentChat() {
  const { messages, sendMessage, status, regenerate } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  });

  const handlePromptSubmit = async (message: PromptInputMessage) => {
    if (!message.text.trim()) return;
    
    await sendMessage({ text: message.text });
  };
  
  const isStreaming = status === 'streaming';
  const isSubmitted = status === 'submitted';
  const isLoading = isStreaming || isSubmitted;

  return (
    <div className="w-full h-full flex flex-col bg-linear-to-b from-background to-muted/20">
      <Conversation className="flex-1">
        <ConversationContent className="gap-6 px-2 py-6">
          {messages.length === 0 ? (
            <ConversationEmptyState
              icon={<SparklesIcon className="size-12" />}
              title="¡Hola! Soy el asistente de Tomás"
              description="Pregúntame lo que quieras sobre Tomás, sus proyectos o habilidades"
            />
          ) : (
            messages.map((message, messageIndex) => (
              <Message
                key={message.id} 
                from={message.role} 
                className={message.role === 'assistant' ? 'w-full max-w-full' : ''}
              >
                <div className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  {/* Avatar */}
                  <div
                    className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center shadow-md ${
                      message.role === 'user'
                        ? 'bg-linear-to-br from-blue-500 to-blue-600'
                        : 'bg-linear-to-br from-purple-500 to-pink-600'
                    }`}
                  >
                    {message.role === 'user' ? (
                      <User className="size-5 text-white" />
                    ) : (
                      <Bot className="size-5 text-white" />
                    )}
                  </div>

                  {/* Message Content */}
                  <div className={message.role === 'assistant' ? 'flex-1 overflow-hidden' : 'overflow-hidden'}>
                    <div className="text-xs font-medium text-muted-foreground mb-2">
                      {message.role === 'user' ? 'Tú' : 'Asistente de Tomás'}
                    </div>
                    <MessageContent className={message.role === 'assistant' ? 'w-full overflow-x-auto' : ''}>
                      {message.parts.map((part, partIndex) => {
                        if (part.type === 'text') {
                          return (
                            <MessageResponse key={partIndex}>
                              {part.text}
                            </MessageResponse>
                          );
                        }
                        return null;
                      })}
                    </MessageContent>
                    
                    {/* Actions for assistant messages */}
                    {message.role === 'assistant' && messageIndex === messages.length - 1 && !isLoading && (
                      <MessageActions className="mt-3">
                        <MessageAction
                          onClick={() => regenerate()}
                          label="Regenerar respuesta"
                          tooltip="Regenerar respuesta"
                        >
                          <RefreshCcwIcon className="size-3" />
                        </MessageAction>
                        <MessageAction
                          onClick={() => {
                            const textContent = message.parts
                              .filter((p) => p.type === 'text')
                              .map((p) => p.text)
                              .join('\n');
                            navigator.clipboard.writeText(textContent);
                          }}
                          label="Copiar"
                          tooltip="Copiar respuesta"
                        >
                          <CopyIcon className="size-3" />
                        </MessageAction>
                      </MessageActions>
                    )}
                  </div>
                </div>
              </Message>
            ))
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      {/* Input Area */}
      <div className="border-t border-border/50 backdrop-blur-sm bg-background/80 p-4">
        <PromptInput onSubmit={handlePromptSubmit} className="w-full">
          <PromptInputBody>
            <PromptInputTextarea
              placeholder="Haz una pregunta a mi agente..."
              disabled={isLoading}
              className="min-h-12 resize-none"
            />
          </PromptInputBody>
          <PromptInputFooter className="pt-2">
            <div className="flex-1" />
            <PromptInputSubmit status={status} />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
}