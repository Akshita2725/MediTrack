import React, { useState, useMemo } from 'react';
import {
  MessageSquare,
  Send,
  User,
  Stethoscope,
  Clock,
  Search,
  CheckCheck,
  Phone,
  Video,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { PageHeader } from '../components/common/PageHeader.jsx';
import { Card } from '../components/common/Card.jsx';
import { Button } from '../components/common/Button.jsx';
import { Badge } from '../components/common/Badge.jsx';

export const MessagesPage = () => {
  const {
    messages,
    sendMessage,
    role,
    currentDoctor,
    currentPatient,
    doctors,
    patients
  } = useApp();

  // Selected Thread contact ID
  const [activeContactId, setActiveContactId] = useState(() => {
    if (role === 'doctor') {
      return patients[0]?.id || 'pat-1';
    } else {
      return doctors[0]?.id || 'doc-1';
    }
  });

  const [messageText, setMessageText] = useState('');
  const [searchContact, setSearchContact] = useState('');

  // Contacts list based on active role
  const contacts = useMemo(() => {
    if (role === 'doctor') {
      return patients.map(p => ({
        id: p.id,
        name: p.name,
        subtitle: `Patient (Age ${p.age})`,
        avatar: p.avatar,
        badge: p.bloodGroup
      }));
    } else {
      return doctors.map(d => ({
        id: d.id,
        name: d.name,
        subtitle: d.specialty,
        avatar: d.avatar,
        badge: `$${d.fee}`
      }));
    }
  }, [role, doctors, patients]);

  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(searchContact.toLowerCase())
  );

  const activeContact = contacts.find(c => c.id === activeContactId) || contacts[0];

  // Messages between current user and active contact
  const currentSenderId = role === 'doctor' ? currentDoctor?.id : currentPatient?.id;
  const currentSenderName = role === 'doctor' ? currentDoctor?.name : currentPatient?.name;

  const threadMessages = useMemo(() => {
    return messages.filter(
      m => {
        const recId = m.recipientId || m.receiverId;
        return (
          (m.senderId === currentSenderId && recId === activeContactId) ||
          (m.senderId === activeContactId && recId === currentSenderId)
        );
      }
    );
  }, [messages, currentSenderId, activeContactId]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!messageText.trim() || !activeContact) return;

    sendMessage({
      senderId: currentSenderId || 'user-default',
      senderName: currentSenderName || 'User',
      senderRole: role,
      receiverId: activeContact.id,
      receiverName: activeContact.name,
      content: messageText.trim()
    });

    setMessageText('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <PageHeader
        title="Direct Clinical Messaging & Triage Chat"
        subtitle="Secure encrypted channel between registered patients and attending healthcare practitioners."
      />

      {/* 2-Column Chat Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 h-[620px]">
        {/* Left 4 Cols: Contacts List */}
        <Card className="md:col-span-4 p-0 flex flex-col h-full overflow-hidden border-slate-200/90 shadow-xs">
          <div className="p-3.5 border-b border-slate-100 bg-slate-50/50">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              {role === 'doctor' ? 'Patient Conversations' : 'Attending Specialists'}
            </h3>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={searchContact}
                onChange={e => setSearchContact(e.target.value)}
                placeholder="Search contacts..."
                className="w-full pl-8 pr-3 py-1.5 bg-white text-slate-800 text-xs font-medium rounded-xl border border-slate-200 outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filteredContacts.map(c => {
              const isSelected = c.id === activeContactId;
              return (
                <div
                  key={c.id}
                  onClick={() => setActiveContactId(c.id)}
                  className={`p-3 flex items-center gap-3 cursor-pointer transition-all ${
                    isSelected ? 'bg-blue-50/80 border-l-4 border-blue-600' : 'hover:bg-slate-50'
                  }`}
                >
                  <img
                    src={c.avatar}
                    alt={c.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-2xs"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{c.name}</h4>
                      <Badge variant="primary" size="sm">
                        {c.badge}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">{c.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Right 8 Cols: Active Chat Conversation */}
        <Card className="md:col-span-8 p-0 flex flex-col h-full bg-white border-slate-200/90 shadow-xs overflow-hidden">
          {/* Active Contact Header */}
          {activeContact && (
            <div className="p-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <img
                  src={activeContact.avatar}
                  alt={activeContact.name}
                  className="w-9 h-9 rounded-full object-cover border border-slate-200 shadow-2xs"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{activeContact.name}</h4>
                  <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active Clinical Session
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/30">
            {threadMessages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 text-xs">
                <MessageSquare className="w-8 h-8 mb-2 text-slate-300" />
                <p className="font-semibold text-slate-700">No previous messages in this channel.</p>
                <p className="text-[11px] text-slate-400 font-medium mt-0.5">Send a clinical query or consultation update below.</p>
              </div>
            ) : (
              threadMessages.map(m => {
                const isMine = m.senderId === currentSenderId;
                return (
                  <div
                    key={m.id}
                    className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-md p-3.5 rounded-2xl text-xs space-y-1 shadow-2xs font-medium ${
                        isMine
                          ? 'bg-blue-600 text-white rounded-br-xs'
                          : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-xs'
                      }`}
                    >
                      <p className="leading-relaxed">{m.content}</p>
                      <div
                        className={`text-[10px] flex items-center justify-end gap-1 font-semibold ${
                          isMine ? 'text-blue-100' : 'text-slate-400'
                        }`}
                      >
                        <span>{new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        {isMine && <CheckCheck className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Chat Message Input */}
          <form onSubmit={handleSend} className="p-3 border-t border-slate-100 bg-white flex items-center gap-2">
            <input
              type="text"
              value={messageText}
              onChange={e => setMessageText(e.target.value)}
              placeholder={`Send message to ${activeContact?.name || 'user'}...`}
              className="flex-1 px-3.5 py-2.5 bg-slate-50 text-slate-800 text-xs font-medium rounded-xl border border-slate-200 outline-none focus:bg-white focus:border-blue-500 transition-colors"
            />
            <Button
              type="submit"
              variant="primary"
              size="md"
              icon={<Send className="w-4 h-4" />}
              className="shadow-xs shadow-blue-500/25"
            >
              Send
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};
