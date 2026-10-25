import React, { useState, useEffect, useCallback } from 'react';
import {
  Globe,
  Search,
  RotateCcw,
  BookOpen,
  GitFork,
  Star,
  Users,
  MapPin,
  ExternalLink,
  Bookmark,
  Edit2,
  Trash2,
  Plus,
  Check,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Pill,
  Sparkles
} from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce.js';
import { useToast } from '../context/ToastContext.jsx';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { Card } from '../components/common/Card.jsx';
import { Button } from '../components/common/Button.jsx';
import { Badge } from '../components/common/Badge.jsx';
import { Tabs } from '../components/common/Tabs.jsx';

export const ApiExplorerPage = () => {
  const toast = useToast();

  // Active Tab: GitHub Profile Viewer vs Public Health / Drug REST API
  const [activeTab, setActiveTab] = useState('github');

  // --- TOPIC 67-72: GITHUB PROFILE VIEWER STATE ---
  const [searchInput, setSearchInput] = useState('gaearon');
  const debouncedSearch = useDebounce(searchInput, 600);

  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [reposPage, setReposPage] = useState(1);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [isLoadingRepos, setIsLoadingRepos] = useState(false);
  const [apiError, setApiError] = useState(null);

  // --- CRUD WORKFLOW STATE: Bookmarks & Research Notes (Topic 67-72) ---
  const [bookmarks, setBookmarks] = useLocalStorage('meditrack_api_bookmarks', [
    {
      id: 'bm-1',
      title: 'Dan Abramov (gaearon)',
      url: 'https://github.com/gaearon',
      note: 'React core team member, Redux creator. Reference for state architecture.',
      createdAt: '2026-10-20'
    }
  ]);
  const [noteInput, setNoteInput] = useState('');
  const [editingBookmarkId, setEditingBookmarkId] = useState(null);
  const [editNoteText, setEditNoteText] = useState('');

  // --- TOPIC 67-72: DRUG / HEALTH REST API (OpenFDA) STATE ---
  const [drugQuery, setDrugQuery] = useState('ibuprofen');
  const debouncedDrug = useDebounce(drugQuery, 600);
  const [drugResults, setDrugResults] = useState([]);
  const [isLoadingDrug, setIsLoadingDrug] = useState(false);
  const [drugError, setDrugError] = useState(null);

  // Fetch GitHub User Profile via REST API (fetch)
  const fetchGitHubProfile = useCallback(async (username) => {
    if (!username || !username.trim()) return;

    setIsLoadingProfile(true);
    setApiError(null);

    try {
      const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username.trim())}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`GitHub user "${username}" was not found (404 Not Found).`);
        } else if (response.status === 403) {
          throw new Error('GitHub API rate limit reached. Please wait a minute or retry.');
        } else {
          throw new Error(`REST API error: ${response.status} ${response.statusText}`);
        }
      }
      const data = await response.json();
      setProfile(data);
      setReposPage(1);
      fetchRepos(username.trim(), 1);
    } catch (err) {
      setApiError(err.message || 'Failed to fetch user profile.');
      setProfile(null);
      setRepos([]);
    } finally {
      setIsLoadingProfile(false);
    }
  }, []);

  // Fetch GitHub User Repositories with Pagination
  const fetchRepos = async (username, page) => {
    setIsLoadingRepos(true);
    try {
      const response = await fetch(
        `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=6&page=${page}&sort=updated`
      );
      if (response.ok) {
        const repoData = await response.json();
        setRepos(repoData);
      }
    } catch (err) {
      // Repos fetch non-fatal
    } finally {
      setIsLoadingRepos(false);
    }
  };

  // Debounced auto-fetch on search change
  useEffect(() => {
    if (activeTab === 'github' && debouncedSearch) {
      fetchGitHubProfile(debouncedSearch);
    }
  }, [debouncedSearch, activeTab, fetchGitHubProfile]);

  // Handle Repos Pagination
  const handlePageChange = (newPage) => {
    if (newPage < 1) return;
    setReposPage(newPage);
    if (profile?.login) {
      fetchRepos(profile.login, newPage);
    }
  };

  // --- CRUD Operations on Bookmarks ---
  // Create
  const handleAddBookmark = () => {
    if (!profile) return;
    const newBm = {
      id: `bm-${Date.now()}`,
      title: `${profile.name || profile.login} (@${profile.login})`,
      url: profile.html_url,
      note: noteInput.trim() || 'Saved medical informatics researcher / developer profile.',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setBookmarks((prev) => [newBm, ...prev]);
    setNoteInput('');
    toast.success(`Bookmarked @${profile.login}!`);
  };

  // Update
  const handleSaveEditNote = (id) => {
    setBookmarks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, note: editNoteText } : b))
    );
    setEditingBookmarkId(null);
    toast.info('Research note updated.');
  };

  // Delete
  const handleDeleteBookmark = (id) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
    toast.info('Bookmark removed.');
  };

  // --- OpenFDA REST API Fetch ---
  const fetchDrugData = useCallback(async (query) => {
    if (!query || !query.trim()) return;
    setIsLoadingDrug(true);
    setDrugError(null);
    try {
      const response = await fetch(
        `https://api.fda.gov/drug/label.json?limit=4&search=openfda.brand_name:${encodeURIComponent(query.trim())}`
      );
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`No FDA drug labels found for "${query}". Try "aspirin", "amoxicillin", or "lipitor".`);
        }
        throw new Error(`OpenFDA REST API status: ${response.status}`);
      }
      const data = await response.json();
      setDrugResults(data.results || []);
    } catch (err) {
      setDrugError(err.message || 'Error querying OpenFDA API.');
      setDrugResults([]);
    } finally {
      setIsLoadingDrug(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'drug' && debouncedDrug) {
      fetchDrugData(debouncedDrug);
    }
  }, [debouncedDrug, activeTab, fetchDrugData]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-blue-200 border border-white/20 mb-3">
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <span>Mini Project: GitHub Profile Viewer & REST API Explorer (Topic 67-72)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            REST API & Third-Party Integration Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
            Consuming real REST APIs using <code className="text-blue-300 font-mono">fetch</code>, debounced input, loading state skeletons, retry error handling, pagination, and persistent CRUD notes.
          </p>
        </div>

        {/* Quick Stats Pill */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center gap-3">
          <Bookmark className="w-8 h-8 text-amber-400" />
          <div>
            <div className="text-[11px] font-bold uppercase text-slate-300">Saved Bookmarks</div>
            <div className="text-xl font-mono font-extrabold">{bookmarks.length} records</div>
          </div>
        </div>
      </div>

      {/* Mode Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-2">
        <Tabs
          tabs={[
            { id: 'github', label: 'GitHub Profile Viewer (Mini Project)', icon: Users },
            { id: 'drug', label: 'OpenFDA Drug REST API', icon: Pill },
            { id: 'crud', label: `Saved Research Notes (${bookmarks.length})`, icon: Bookmark }
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </div>

      {/* --- TAB 1: GITHUB PROFILE VIEWER --- */}
      {activeTab === 'github' && (
        <div className="space-y-6">
          {/* Search Bar & Suggested Handles */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Enter GitHub username (e.g. gaearon, torvalds, CDCgov, NIH)..."
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:border-blue-600 focus:bg-white transition-colors font-medium"
                />
              </div>
              <Button
                onClick={() => fetchGitHubProfile(searchInput)}
                disabled={isLoadingProfile}
                className="gap-2 shrink-0"
              >
                {isLoadingProfile ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
                <span>Search Profile</span>
              </Button>
            </div>

            {/* Quick Suggestions Chips */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-slate-400 font-semibold mr-1">Quick Suggestions:</span>
              {['gaearon', 'torvalds', 'kentcdodds', 'CDCgov', 'NIH', 'facebook'].map((handle) => (
                <button
                  key={handle}
                  type="button"
                  onClick={() => {
                    setSearchInput(handle);
                    fetchGitHubProfile(handle);
                  }}
                  className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-bold border transition-colors cursor-pointer ${
                    searchInput === handle
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  @{handle}
                </button>
              ))}
            </div>
          </div>

          {/* Loading Skeleton */}
          {isLoadingProfile && (
            <Card className="p-6 animate-pulse space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-slate-200" />
                <div className="space-y-2 flex-1">
                  <div className="h-5 bg-slate-200 rounded w-1/3" />
                  <div className="h-4 bg-slate-100 rounded w-1/4" />
                </div>
              </div>
              <div className="h-12 bg-slate-100 rounded-xl" />
            </Card>
          )}

          {/* Error State with Retry Button */}
          {apiError && !isLoadingProfile && (
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-rose-900 text-base">API Request Failed</h3>
              <p className="text-xs text-rose-700 max-w-md mx-auto">{apiError}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => fetchGitHubProfile(searchInput)}
                className="gap-2 bg-white text-rose-700 border-rose-300 hover:bg-rose-100"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retry Request</span>
              </Button>
            </div>
          )}

          {/* Profile Card & Repositories */}
          {!isLoadingProfile && !apiError && profile && (
            <div className="space-y-6">
              {/* Profile Card */}
              <Card className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                    <img
                      src={profile.avatar_url}
                      alt={profile.login}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-slate-200 shadow-md"
                    />
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                          {profile.name || profile.login}
                        </h2>
                        <span className="font-mono text-xs text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md font-bold">
                          @{profile.login}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 max-w-xl leading-relaxed">
                        {profile.bio || 'No bio provided for this profile.'}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
                        {profile.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            {profile.location}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-slate-400" />
                          <strong>{profile.followers}</strong> followers &bull; <strong>{profile.following}</strong> following
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                          <strong>{profile.public_repos}</strong> public repos
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap sm:flex-col gap-2 w-full sm:w-auto">
                    <a
                      href={profile.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors"
                    >
                      <span>View on GitHub</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Bookmark / Note Input Action */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                    placeholder="Add an optional clinical / research bookmark note..."
                    className="flex-1 text-xs px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:border-blue-600 font-medium"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleAddBookmark}
                    className="gap-1.5 shrink-0"
                  >
                    <Bookmark className="w-3.5 h-3.5 text-amber-500" />
                    <span>Save to Research Bookmarks</span>
                  </Button>
                </div>
              </Card>

              {/* Repositories with Pagination */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    <span>Public Repositories (Page {reposPage})</span>
                  </h3>

                  {/* Pagination Controls (Topic 67-72) */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={reposPage <= 1 || isLoadingRepos}
                      onClick={() => handlePageChange(reposPage - 1)}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
                      title="Previous page"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-mono font-bold px-2 text-slate-700">
                      Page {reposPage}
                    </span>
                    <button
                      type="button"
                      disabled={repos.length < 6 || isLoadingRepos}
                      onClick={() => handlePageChange(reposPage + 1)}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
                      title="Next page"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {isLoadingRepos ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <div key={n} className="h-28 bg-white rounded-2xl border border-slate-200 p-4 animate-pulse" />
                    ))}
                  </div>
                ) : repos.length === 0 ? (
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 text-center text-xs text-slate-400">
                    No repositories found on this page.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {repos.map((repo) => (
                      <a
                        key={repo.id}
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white rounded-2xl border border-slate-200/80 p-4 hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between group"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 truncate font-mono">
                              {repo.name}
                            </h4>
                            {repo.language && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 shrink-0">
                                {repo.language}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-2 mt-1.5">
                            {repo.description || 'No description provided.'}
                          </p>
                        </div>

                        <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400 pt-3 border-t border-slate-100 mt-3">
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                            {repo.stargazers_count}
                          </span>
                          <span className="flex items-center gap-1">
                            <GitFork className="w-3 h-3 text-slate-400" />
                            {repo.forks_count}
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* --- TAB 2: OPENFDA DRUG REST API --- */}
      {activeTab === 'drug' && (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  value={drugQuery}
                  onChange={(e) => setDrugQuery(e.target.value)}
                  placeholder="Query OpenFDA Drug database (e.g. ibuprofen, amoxicillin, metformin)..."
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl outline-hidden focus:border-blue-600 font-medium"
                />
              </div>
              <Button
                onClick={() => fetchDrugData(drugQuery)}
                disabled={isLoadingDrug}
                className="gap-2 shrink-0"
              >
                {isLoadingDrug ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Pill className="w-4 h-4" />
                )}
                <span>Query FDA API</span>
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-slate-400 font-semibold mr-1">Sample Drugs:</span>
              {['ibuprofen', 'amoxicillin', 'metformin', 'aspirin', 'atorvastatin'].map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => {
                    setDrugQuery(name);
                    fetchDrugData(name);
                  }}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-bold border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* Loading */}
          {isLoadingDrug && (
            <div className="space-y-3">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-32 bg-white rounded-2xl border border-slate-200 p-4 animate-pulse" />
              ))}
            </div>
          )}

          {/* Error */}
          {drugError && !isLoadingDrug && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center space-y-2">
              <AlertTriangle className="w-8 h-8 text-amber-600 mx-auto" />
              <p className="text-xs font-semibold text-amber-800">{drugError}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => fetchDrugData(drugQuery)}
                className="bg-white text-xs mt-2"
              >
                Retry Search
              </Button>
            </div>
          )}

          {/* Results */}
          {!isLoadingDrug && !drugError && drugResults.length > 0 && (
            <div className="space-y-4">
              {drugResults.map((drug, idx) => {
                const brandName = drug.openfda?.brand_name?.[0] || 'Unknown Brand';
                const genericName = drug.openfda?.generic_name?.[0] || 'Generic formulation';
                const manufacturer = drug.openfda?.manufacturer_name?.[0] || 'Official Manufacturer';
                const purpose = drug.purpose?.[0] || drug.indications_and_usage?.[0] || 'Prescription monograph';

                return (
                  <Card key={idx} className="p-5 space-y-2.5 hover:shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-extrabold text-slate-900">{brandName}</h4>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                            FDA Monograph
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-slate-500 mt-0.5">
                          Generic: {genericName} &bull; Mfg: {manufacturer}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100 font-mono">
                      {purpose}
                    </p>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* --- TAB 3: CRUD WORKFLOW (Research Bookmarks) --- */}
      {activeTab === 'crud' && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-amber-500" />
                <span>CRUD Workflow: Research Notes & Profile Bookmarks</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Demonstrates Create, Read, Update, and Delete operations with persistent storage.
              </p>
            </div>
            <span className="text-xs font-bold font-mono text-slate-600">
              {bookmarks.length} saved
            </span>
          </div>

          {bookmarks.length === 0 ? (
            <div className="py-8 text-center text-slate-400 space-y-2">
              <Bookmark className="w-10 h-10 mx-auto text-slate-300" />
              <p className="text-xs font-bold text-slate-600">No bookmarks saved yet</p>
              <p className="text-[11px] text-slate-400">
                Search a profile in the GitHub viewer tab and click "Save to Research Bookmarks".
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {bookmarks.map((bm) => (
                <div key={bm.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">{bm.title}</h4>
                      <span className="text-[10px] text-slate-400 font-mono">{bm.createdAt}</span>
                    </div>

                    {editingBookmarkId === bm.id ? (
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="text"
                          value={editNoteText}
                          onChange={(e) => setEditNoteText(e.target.value)}
                          className="text-xs px-2.5 py-1.5 border border-blue-500 rounded-lg w-full max-w-md outline-hidden bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => handleSaveEditNote(bm.id)}
                          className="p-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                          title="Save note"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-600">{bm.note}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <a
                      href={bm.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-lg"
                      title="Open external link"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingBookmarkId(bm.id);
                        setEditNoteText(bm.note);
                      }}
                      className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
                      title="Edit note"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteBookmark(bm.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                      title="Delete bookmark"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}
    </div>
  );
};
