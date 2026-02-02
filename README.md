# Enterprise-Grade RAG Chatbot (Frontend-Only)

Production-grade, frontend-only RAG chatbot implemented with React, TypeScript, Vite, and Tailwind. All AI behavior and data retrieval are mocked while the architecture mirrors a real enterprise RAG stack. This repo is intentionally “frontend-only” but designed like a production system so a real backend can be dropped in later.

## Quickstart

```bash
npm install
npm run dev
npm run test
```

## Key Features

- **Chat experience** with user/assistant message bubbles, typing indicator, retry, and async responses.
- **Citations on every assistant response** with doc title, page/section, snippet, and unique ID.
- **In-app document viewer** with highlighted excerpt, citation switching, and smooth drawer animation.
- **Conversation history** with new chat + switching.
- **Mobile-first behavior**: drawers for conversations and viewer, tap‑outside to close.
- **Robust mocked API**: latency, failures, null/empty responses, and no-results paths.

## Architecture & Design Rationale

- **Clear separation of concerns:** UI components are presentational, while orchestration lives in controllers/hooks. This keeps the UI clean and makes backend swaps straightforward.
- **RAG simulation layer:** `chatService` emulates retrieval + generation, latency, and error modes. This keeps behavior deterministic and testable without external services.
- **Strong domain modeling:** `Conversation`, `Message`, `Citation`, and `ChatResponse` are first-class types to enforce API contract clarity.
- **Scalable UI layout:** A single layout shell coordinates chat, sidebar, and viewer so the system can expand to multi-pane or new tools later.
- **Accessible foundations:** ARIA roles on the chat log and dialog ensure assistive tech announces updates appropriately.

## Key Components & Responsibilities

- `src/app/AppShell.tsx`: Root layout and orchestration (header, viewer, overlays).
- `src/features/chat/ChatShell.tsx`: Binds controllers to chat UI and manages mobile drawer.
- `src/Chat/*`: Chat UI primitives (message list, bubble, input, typing indicator).
- `src/components/ConversationSidebar.tsx`: Conversation list + “New Chat”.
- `src/Viewer/DocumentViewer.tsx`: In-app viewer with citations, highlighted excerpt, and smooth animation.
- `src/chat/useChatController.ts`: Message flow, error/retry handling, loading state.
- `src/Viewer/useDocumentViewerController.ts`: Viewer open/close/select logic.
- `src/services/chatService.ts`: Mock RAG pipeline (tokenize → score → citations → answer).
- `src/documents/corpus.ts`: Mock document corpus for retrieval and snippet building.

## State Management & Ownership

Zustand centralizes app state to keep logic predictable and avoid prop drilling.

| State | Location | Notes |
| --- | --- | --- |
| Conversations, messages | `useChatStore` | `conversationsById`, `conversationOrder` |
| Active conversation | `useChatStore` | `activeConversationId` |
| Loading & error | `useChatStore` | Input disable + retry UI |
| Last user message | `useChatStore` | Enables retry behavior |
| Viewer state | `useChatStore` | Open/close, citations list, selected citation |

## How This Maps to a Real Backend

The mock service mirrors a production RAG flow:

- **Tokenization / keyword scoring →** would become embedding search + reranking.
- **Citation shaping →** would map to chunk IDs, titles, page/section metadata.
- **Latency + errors →** stand-ins for API timeouts, transient failures, and no-results responses.

To wire a real backend, replace `sendChatMessage` in `src/services/chatService.ts` with an HTTP client call, leaving the controller + UI unchanged. The request/response contracts and type models already match typical RAG APIs.

## UX & Interaction Notes

- **Enter vs Shift+Enter:** Enter sends, Shift+Enter inserts a newline.
- **Scroll-to-latest** appears only when you’re not at the bottom; smooth scroll on click.
- **Focus management:** input regains focus after a response so users can keep typing.
- **Mobile drawers:** conversations and viewer are off‑canvas and dismissible by tap‑outside.

## Trade-offs (Scope & Complexity)

- Retrieval uses keyword matching instead of embeddings to keep the demo deterministic.
- Viewer uses a simplified layout vs. full PDF or rich document rendering.
- No persistence layer (local storage or backend) to keep the focus on core UX.
 - Layout prioritizes clarity and speed over “pixel-perfect” theming systems.

## Potential Improvements

- Streaming responses for a more “live” assistant feel.
- Persist conversations to local storage or a backend.
- Richer document viewer (PDF pages, highlights with anchors).
- Enhanced accessibility (focus trapping in dialogs, announcements for new citations).
- User settings for theme/latency/behavior.

## Testing

- `vitest` + Testing Library cover retrieval logic, viewer behavior, error retry, and conversation switching.

## Screenshots

<img src="/public/Image%2003-02-26%20at%2012.49%20AM.jpg" width="720" alt="Enterprise RAG - Screenshot 1" />
<img src="/public/Image%2003-02-26%20at%2012.49%20AM%20(1).jpg" width="720" alt="Enterprise RAG - Screenshot 2" />
<img src="/public/Image%2003-02-26%20at%2012.50%20AM.jpg" width="720" alt="Enterprise RAG - Screenshot 3" />
<img src="/public/Image%2003-02-26%20at%2012.51%20AM.jpg" width="320" alt="Enterprise RAG - Screenshot 4" />
<img src="/public/Image%2003-02-26%20at%2012.52%20AM.jpg" width="320" alt="Enterprise RAG - Screenshot 5" />
<img src="/public/Image%2003-02-26%20at%2012.52%20AM%20(1).jpg" width="320" alt="Enterprise RAG - Screenshot 6" />
