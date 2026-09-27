import { useState } from 'react';
import { AuthForm } from './components/auth/AuthForm';
import { ChatSidebar } from './components/chat/ChatSidebar';
import { ChatWindow } from './components/chat/ChatWindow';
import { useAuth } from './hooks/useAuth';
import { useChat } from './hooks/useChat';
import { demoChat } from './mock/mockData';

export default function App() {
  const initialDemoMode =
    new URLSearchParams(
      window.location.search,
    ).get('demo') === '1';

  const [demoMode, setDemoMode] =
    useState(initialDemoMode);

  const auth = useAuth();

  const chat = useChat({
    client: auth.client,
    demoMode,
  });

  const handleDemo = () => {
    setDemoMode(true);

    auth.reset();

    chat.reset(true);
  };

  const handleLogout = () => {
    setDemoMode(false);

    auth.reset();

    chat.reset(false);
  };

  if (!demoMode && !auth.client) {
    return (
      <AuthForm
        loading={auth.loading}
        error={auth.error}
        onConnect={auth.connect}
        onDemo={handleDemo}
      />
    );
  }

  return (
    <div className="app-shell">
      <ChatSidebar
        chat={
          demoMode
            ? demoChat
            : chat.activeChat
        }
        loading={chat.creating}
        error={chat.error}
        onCreateChat={chat.createChat}
        onLogout={handleLogout}
      />

      <ChatWindow
        chat={
          demoMode
            ? demoChat
            : chat.activeChat
        }
        messages={chat.messages}
        notificationStatus={
          demoMode
            ? 'connected'
            : chat.notificationStatus
        }
        sending={chat.sending}
        onSend={chat.sendMessage}
      />
    </div>
  );
}
