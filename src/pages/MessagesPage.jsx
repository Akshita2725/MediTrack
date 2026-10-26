import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';

export function MessagesPage() {
  const { messages, sendMessage, doctors, patients, role } = useApp();

  // Pick contact list based on role
  const contacts = role === 'doctor' ? patients : doctors;
  const [selectedContactId, setSelectedContactId] = useState(contacts[0]?.id || 'doc-1');
  const [inputMessage, setInputMessage] = useState('');

  const selectedContact = contacts.find((c) => c.id === selectedContactId) || contacts[0];

  // Filter messages for current selected contact
  const conversation = messages.filter(
    (m) =>
      m.recipientId === selectedContactId ||
      m.receiverId === selectedContactId ||
      m.senderId === selectedContactId
  );

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    sendMessage(selectedContactId, inputMessage.trim());
    setInputMessage('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Messages & Chat</h1>
        <p className="text-gray-500 text-sm">Direct messaging between doctors and registered patients</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden grid grid-cols-1 md:grid-cols-3 min-h-[500px]">
        {/* Contact List */}
        <div className="border-r border-gray-100 bg-gray-50/50 p-4 space-y-2">
          <h2 className="text-xs font-semibold uppercase text-gray-500 tracking-wider mb-3">
            {role === 'doctor' ? 'Your Patients' : 'Your Doctors'}
          </h2>
          <div className="space-y-1">
            {contacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => setSelectedContactId(contact.id)}
                className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition ${
                  selectedContactId === contact.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white hover:bg-gray-100 text-gray-800'
                }`}
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${
                  selectedContactId === contact.id ? 'bg-blue-700 text-white' : 'bg-blue-100 text-blue-600'
                }`}>
                  {contact.name?.charAt(0)}
                </div>
                <div className="overflow-hidden">
                  <div className="font-semibold text-sm truncate">{contact.name}</div>
                  <div className={`text-xs truncate ${selectedContactId === contact.id ? 'text-blue-100' : 'text-gray-400'}`}>
                    {contact.specialty || contact.gender || 'Patient'}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="md:col-span-2 flex flex-col justify-between h-[520px]">
          {/* Contact Header */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
            <div>
              <h3 className="font-bold text-gray-800 text-sm">{selectedContact?.name}</h3>
              <p className="text-xs text-green-600 font-medium">● Available Online</p>
            </div>
            <span className="text-xs text-gray-400">{selectedContact?.specialty || 'General Care'}</span>
          </div>

          {/* Messages Bubble List */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
            {conversation.length === 0 ? (
              <div className="text-center text-gray-400 text-sm py-12">
                No previous messages. Say hello to {selectedContact?.name}!
              </div>
            ) : (
              conversation.map((msg) => {
                const isSentByMe = msg.recipientId === selectedContactId || msg.receiverId === selectedContactId;
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isSentByMe ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-xs sm:max-w-md px-4 py-2.5 rounded-2xl text-sm ${
                        isSentByMe
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
                      }`}
                    >
                      {msg.text || msg.content}
                    </div>
                    <span className="text-[10px] text-gray-400 mt-1 px-1">
                      {msg.senderName} • {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                );
              })
            )}
          </div>

          {/* Message Input Box */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`Message ${selectedContact?.name || ''}...`}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
