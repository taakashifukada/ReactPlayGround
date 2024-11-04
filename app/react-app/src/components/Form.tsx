import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogFooter } from './ui/dialog';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Card, CardContent } from './ui/card';

// 型定義
interface TabData {
  id: string;
  title: string;
  data: ContentItem[];
}

interface ContentItem {
  id: number;
  title: string;
  description: string;
}

interface ImageItem {
  id: number;
  url: string;
  alt: string;
}

interface State {
  selectedImage: number | null;
  prompt: string;
  confirmedImage: number | null;
}

interface TabStates {
  [key: string]: State;
}

const MAX_TABS = 2;

const ImageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [currentTab, setCurrentTab] = useState<string | null>(null);
  const [activeTabs, setActiveTabs] = useState<TabData[]>([]);
  const [hasChanges, setHasChanges] = useState(false);
  
  const [workingState, setWorkingState] = useState<State>({
    selectedImage: null,
    prompt: '',
    confirmedImage: null
  });
  
  const [tabStates, setTabStates] = useState<TabStates>({});

  const sampleImages: ImageItem[] = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    url: '/api/placeholder/200/200',
    alt: `Sample ${i + 1}`
  }));

  useEffect(() => {
    if (!currentTab) {
      setHasChanges(workingState.selectedImage !== null || workingState.prompt.length > 0);
    } else {
      const savedState = tabStates[currentTab];
      if (savedState) {
        const hasImageChange = workingState.selectedImage !== savedState.selectedImage;
        const hasPromptChange = workingState.prompt !== savedState.prompt;
        setHasChanges(hasImageChange || hasPromptChange);
      }
    }
  }, [currentTab, workingState, tabStates]);

  useEffect(() => {
    if (currentTab && tabStates[currentTab]) {
      setWorkingState(tabStates[currentTab]);
    }
  }, [currentTab, tabStates]);

  const generateDummyContent = (count: number): ContentItem[] => {
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      title: `Content Item ${i + 1}`,
      description: `This is a detailed description for content item ${i + 1}.`
    }));
  };

  const handlePrevious = () => {
    setCarouselIndex(prev => 
      prev === 0 ? Math.ceil(sampleImages.length/6) - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCarouselIndex(prev => 
      prev === Math.ceil(sampleImages.length/6) - 1 ? 0 : prev + 1
    );
  };

  const handleImageSelect = (imageId: number) => {
    setWorkingState(prev => ({
      ...prev,
      selectedImage: imageId
    }));
  };

  const handleConfirm = () => {
    setWorkingState(prev => ({
      ...prev,
      confirmedImage: prev.selectedImage
    }));
    setIsOpen(false);
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setWorkingState(prev => ({
      ...prev,
      prompt: e.target.value
    }));
  };

  const handleTabChange = (tabId: string) => {
    setCurrentTab(tabId);
  };

  const handleSubmit = () => {
    if (activeTabs.length === 0) {
      // 初回のsubmit: Tab 1を作成
      const newTab: TabData = {
        id: 'tab1',
        title: 'Tab 1',
        data: generateDummyContent(10)
      };
      setActiveTabs([newTab]);
      setTabStates({
        tab1: { ...workingState }
      });
      setCurrentTab('tab1');
    } else if (activeTabs.length === 1) {
      // 2つ目のタブを追加
      const newTab: TabData = {
        id: 'tab2',
        title: 'Tab 2',
        data: generateDummyContent(10)
      };
      setActiveTabs(prev => [...prev, newTab]);
      setTabStates(prev => ({
        ...prev,
        [newTab.id]: { ...workingState }
      }));
      setCurrentTab('tab2');
    } else if (currentTab) {
      // タブが2つある状態でのsubmit
      const currentTabIndex = activeTabs.findIndex(tab => tab.id === currentTab);
      const otherTabIndex = currentTabIndex === 0 ? 1 : 0;
      const otherTabId = activeTabs[otherTabIndex].id;
      
      const updatedTabs = [...activeTabs];
      updatedTabs[otherTabIndex] = {
        ...activeTabs[otherTabIndex],
        data: generateDummyContent(10)
      };
      
      setActiveTabs(updatedTabs);
      setTabStates(prev => ({
        ...prev,
        [otherTabId]: { ...workingState }
      }));
      setCurrentTab(otherTabId);
    }
    
    if (!currentTab) {
      setWorkingState({
        selectedImage: null,
        prompt: '',
        confirmedImage: null
      });
    }
    
    setHasChanges(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* フローティング要素のコンテナ */}
      <div className="fixed top-4 left-4 right-4 z-10 space-y-4 max-w-4xl mx-auto">
        {/* 選択画像表示とre-selectボタンのコンテナ */}
        <div className="space-y-2">
          {workingState.confirmedImage && (
            <div className="w-full bg-white text-gray-800 shadow-lg rounded-lg p-4 text-center border border-gray-100">
              <div className="flex items-center justify-center space-x-2 text-gray-700">
                <span className="font-medium">Selected Image: {workingState.confirmedImage}</span>
              </div>
            </div>
          )}
          <Button 
            onClick={() => setIsOpen(true)}
            className="w-full bg-white hover:bg-gray-50 text-gray-800 shadow-lg border-0 rounded-lg
                     transition-all duration-200 ease-in-out transform hover:scale-[1.01]"
            size="lg"
          >
            {workingState.confirmedImage ? 'Re-select' : 'Select image'}
          </Button>
        </div>

        {/* プロンプトフォームとSubmitボタン */}
        <div className="space-y-2">
          <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-100">
            <textarea
              value={workingState.prompt}
              onChange={handlePromptChange}
              className="w-full min-h-[100px] p-3 border border-gray-200 rounded-lg
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       transition-all duration-200 ease-in-out
                       placeholder:text-gray-400"
              placeholder="Enter your prompt here..."
            />
          </div>
          <Button
            onClick={handleSubmit}
            className="w-full shadow-lg rounded-lg transition-all duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transform hover:scale-[1.01]"
            size="lg"
            disabled={!hasChanges}
          >
            {activeTabs.length === MAX_TABS 
              ? `Update ${currentTab ? 'Other Tab' : 'Tab'}`
              : 'Submit'}
          </Button>
        </div>

        {/* タブ */}
        {activeTabs.length > 0 && (
          <Tabs 
            value={currentTab || undefined}
            onValueChange={handleTabChange} 
            className="w-full bg-white rounded-lg shadow-lg border border-gray-100"
          >
            <TabsList className="grid w-full grid-cols-2 p-1 bg-gray-50/50">
              {activeTabs.map((tab) => (
                <TabsTrigger 
                  key={tab.id} 
                  value={tab.id}
                  className="py-3 transition-all duration-200 data-[state=active]:bg-white
                           data-[state=active]:shadow-md data-[state=active]:text-blue-600
                           rounded-md"
                >
                  {tab.title}
                </TabsTrigger>
              ))}
            </TabsList>
            {activeTabs.map((tab) => (
              <TabsContent 
                key={tab.id} 
                value={tab.id} 
                className="h-96 overflow-y-auto"
              >
                <div className="sticky top-0 bg-white border-b border-gray-100 z-10 p-4 mb-4 backdrop-blur-sm bg-white/90">
                  <h2 className="text-xl font-bold text-gray-800">
                    {tab.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1 flex items-center space-x-2">
                    <span>Selected: {tabStates[tab.id]?.confirmedImage}</span>
                    <span>•</span>
                    <span>Prompt length: {tabStates[tab.id]?.prompt.length}</span>
                  </p>
                </div>
                
                <div className="space-y-4 px-4 pb-4">
                  {tab.data.map((item) => (
                    <Card 
                      key={item.id} 
                      className="bg-white border border-gray-100 hover:border-gray-200
                               transition-all duration-200 hover:shadow-md"
                    >
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-2 text-gray-800">{item.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{item.description}</p>
                        <div className="mt-4 space-y-2">
                          <p className="text-gray-700">
                            Additional content to make the card longer.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}
      </div>

      {/* 画像選択モーダル */}
      <Dialog 
        open={isOpen} 
        onOpenChange={setIsOpen}
        modal={true}
      >
        <DialogContent className="max-w-4xl bg-white rounded-xl shadow-2xl p-6">
          <div className="relative">
            <div className="grid grid-cols-3 gap-6 my-6">
              {sampleImages.slice(carouselIndex * 6, (carouselIndex + 1) * 6).map((image) => (
                <div
                  key={image.id}
                  className={`
                    relative cursor-pointer rounded-xl overflow-hidden
                    ${workingState.selectedImage === image.id 
                      ? 'ring-2 ring-blue-500 ring-offset-2' 
                      : 'hover:ring-2 hover:ring-blue-300 hover:ring-offset-2'}
                    transition-all duration-200 transform hover:scale-[1.02]
                    shadow-md hover:shadow-xl
                  `}
                  onClick={() => handleImageSelect(image.id)}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full aspect-square object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-black/70 text-white px-2.5 py-1 
                                rounded-md text-sm font-medium backdrop-blur-sm">
                    {image.id}
                  </div>
                  {workingState.selectedImage === image.id && (
                    <div className="absolute inset-0 bg-blue-500/10 transition-opacity duration-200" />
                  )}
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white shadow-lg
                       hover:bg-gray-50 border-0 h-12 w-12 rounded-full"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white shadow-lg
                       hover:bg-gray-50 border-0 h-12 w-12 rounded-full"
              onClick={handleNext}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          <DialogFooter className="mt-6">
            <Button
              onClick={handleConfirm}
              disabled={!workingState.selectedImage}
              className="w-32 shadow-lg rounded-lg transition-all duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed"
              size="lg"
            >
              決定
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageSelector;