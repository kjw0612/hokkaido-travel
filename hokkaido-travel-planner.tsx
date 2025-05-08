import React, { useState } from 'react';
import { CalendarDays, Clock, Plane, MapPin, Utensils, Hotel, Camera, Sun, Moon, Users, Info, Cloud, Check, Heart, Instagram, Globe, Coffee, Snowflake, Book } from 'lucide-react';
import PropTypes from 'prop-types';

// 눈 애니메이션을 위한 키프레임 정의
const snowfallStyles = `
  @keyframes fall {
    0% {
      transform: translateY(-10px);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    100% {
      transform: translateY(100px);
      opacity: 0;
    }
  }
`;

// 메인 앱 컴포넌트
const HokkaidoTripPlanner = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeDay, setActiveDay] = useState(1);
  const [activeFood, setActiveFood] = useState('seafood');
  const [activePhraseCategory, setActivePhraseCategory] = useState('basic');
  const [showSocialLinks, setShowSocialLinks] = useState(false);

  // 소셜 미디어 링크 토글
  const toggleSocialLinks = () => {
    setShowSocialLinks(!showSocialLinks);
  };

  return (
    <div className="bg-blue-50 min-h-screen p-4">
      {/* 스타일 추가 */}
      <style dangerouslySetInnerHTML={{ __html: snowfallStyles }} />
      
      <header className="max-w-6xl mx-auto bg-gradient-to-r from-blue-700 to-blue-500 rounded-t-xl p-6 text-white shadow-lg relative overflow-hidden">
        {/* 눈 모양 장식 */}
        <div className="absolute top-0 left-0 right-0 overflow-hidden h-20 opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={`snowflake-${i}`} 
              className="absolute text-white text-4xl" 
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `fall ${5 + Math.random() * 10}s linear infinite`
              }}
            >
              ❄
            </div>
          ))}
        </div>

        <h1 className="text-3xl font-bold text-center">북국의 낭만: 홋카이도 봄맛 여행 플랜</h1>
        <p className="text-center text-blue-100 mt-2">봄 시즌 (3박 4일)</p>
        
        <div className="flex items-center justify-center mt-4">
          <Plane className="mr-2 text-white" size={20} />
          <p className="text-sm bg-blue-600 px-3 py-1 rounded-full">
            인천 → 신치토세 → 인천
          </p>
        </div>

        {/* 소셜 미디어 링크 버튼 */}
        <button
          onClick={toggleSocialLinks}
          className="absolute top-4 right-4 bg-white text-blue-600 p-2 rounded-full hover:bg-blue-100 transition-colors"
        >
          <Heart size={20} />
        </button>

        {/* 소셜 미디어 링크 패널 */}
        {showSocialLinks && (
          <div className="absolute top-16 right-4 bg-white p-3 rounded-lg shadow-lg text-gray-800 text-sm z-10">
            <div className="text-center font-bold mb-2">홋카이도 여행 정보</div>
            <div className="space-y-2">
              <a 
                href="https://www.instagram.com/explore/tags/홋카이도여행/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-pink-500 hover:underline"
                aria-label="Instagram 홋카이도 여행 태그 페이지로 이동"
              >
                <Instagram size={16} className="mr-1" aria-hidden="true" /> #홋카이도여행
              </a>
              <a 
                href="https://www.visit-hokkaido.jp/kr/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-blue-500 hover:underline"
                aria-label="홋카이도 관광청 공식 한국어 웹사이트로 이동"
              >
                <Globe size={16} className="mr-1" aria-hidden="true" /> 홋카이도 관광청
              </a>
              <a 
                href="https://welcome2k.tistory.com/entry/삿포로-관광지-완벽-가이드-놓치면-후회할-핫스팟-10선" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-green-500 hover:underline"
                aria-label="삿포로 관광 정보 블로그로 이동"
              >
                <MapPin size={16} className="mr-1" aria-hidden="true" /> 삿포로 관광 정보
              </a>
              <a 
                href="https://blog.naver.com/interest11755/223755727358" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-indigo-500 hover:underline"
                aria-label="홋카이도 여행 가이드 네이버 블로그로 이동"
              >
                <Book size={16} className="mr-1" aria-hidden="true" /> 여행 가이드
              </a>
            </div>
          </div>
        )}
      </header>
      
      <nav className="max-w-6xl mx-auto bg-white border-b border-blue-200">
        <div className="flex overflow-x-auto">
          <TabButton 
            active={activeTab === 'overview'} 
            onClick={() => setActiveTab('overview')}
            icon={<Info size={18} />}
            label="여행 개요"
          />
          <TabButton 
            active={activeTab === 'schedule'} 
            onClick={() => setActiveTab('schedule')}
            icon={<CalendarDays size={18} />}
            label="일정 계획"
          />
          <TabButton 
            active={activeTab === 'food'} 
            onClick={() => setActiveTab('food')}
            icon={<Utensils size={18} />}
            label="홋카이도 음식"
          />
          <TabButton 
            active={activeTab === 'hotel'} 
            onClick={() => setActiveTab('hotel')}
            icon={<Hotel size={18} />}
            label="숙소 정보"
          />
          <TabButton 
            active={activeTab === 'shopping'} 
            onClick={() => setActiveTab('shopping')}
            icon={<Globe size={18} />}
            label="쇼핑 가이드"
          />
          <TabButton 
            active={activeTab === 'todo'} 
            onClick={() => setActiveTab('todo')}
            icon={<Check size={18} />}
            label="여행 준비"
          />
          <TabButton 
            active={activeTab === 'phrases'} 
            onClick={() => setActiveTab('phrases')}
            icon={<Users size={18} />}
            label="유용한 표현"
          />
          <TabButton 
            active={activeTab === 'facts'} 
            onClick={() => setActiveTab('facts')}
            icon={<Camera size={18} />}
            label="흥미로운 정보"
          />
        </div>
      </nav>
      
      <main className="max-w-6xl mx-auto bg-white rounded-b-xl p-6 shadow-lg mb-8">
        {activeTab === 'overview' && <Overview />}
        {activeTab === 'schedule' && <Schedule activeDay={activeDay} setActiveDay={setActiveDay} />}
        {activeTab === 'food' && <Food activeFood={activeFood} setActiveFood={setActiveFood} />}
        {activeTab === 'hotel' && <HotelInfo />}
        {activeTab === 'shopping' && <Shopping />}
        {activeTab === 'todo' && <TodoList />}
        {activeTab === 'phrases' && <Phrases activePhraseCategory={activePhraseCategory} setActivePhraseCategory={setActivePhraseCategory} />}
        {activeTab === 'facts' && <Facts />}
      </main>

      {/* 페이지 하단 저작권 표시 */}
      <footer className="max-w-6xl mx-auto text-center text-gray-500 text-sm py-4">
        <p>© 홋카이도 여행 플래너 | 봄 시즌용 여행 계획</p>
        <div className="flex items-center justify-center mt-2">
          <a href="https://www.japan.travel/ko/kr/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mx-2" aria-label="일본정부관광국 공식 사이트로 이동">
            일본정부관광국
          </a>
          <span>|</span>
          <a href="https://www.visit-hokkaido.jp/kr/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mx-2" aria-label="홋카이도 가이드 공식 사이트로 이동">
            홋카이도 가이드
          </a>
          <span>|</span>
          <a href="https://www.instagram.com/explore/tags/홋카이도/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mx-2" aria-label="Instagram 홋카이도 태그 페이지로 이동">
            #홋카이도
          </a>
        </div>
      </footer>
    </div>
  );
};

// 탭 버튼 컴포넌트
const TabButton = ({ active, onClick, icon, label }) => (
  <button 
    className={`flex-1 py-4 px-2 text-center font-semibold transition-all flex flex-col items-center justify-center min-w-24 ${
      active 
        ? 'bg-blue-600 text-white' 
        : 'bg-blue-50 text-blue-800 hover:bg-blue-100'
    }`}
    onClick={onClick}
    aria-pressed={active}
  >
    <div className="mb-1">{icon}</div>
    <span className="text-sm">{label}</span>
  </button>
);

// TabButton Props 타입 정의
TabButton.propTypes = {
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired
};

// 여행 개요 컴포넌트
const Overview = () => (
  <div>
    <h2 className="text-2xl font-bold text-blue-800 mb-4">여행 개요</h2>
    
    <div className="bg-blue-50 p-4 rounded-lg mb-6">
      <p className="text-gray-700 mb-4">
        홋카이도 3박 4일 봄 여행을 위한 완벽한 계획입니다. 편리한 교통과 깔끔한 숙소, 현지 특색 음식을 중심으로 구성했습니다. 삿포로 중심으로 오타루와 주변 명소를 효율적으로 둘러볼 수 있는 일정이며, 봄 시즌의 홋카이도는 15-20°C의 쾌적한 날씨와 함께 봄꽃 시즌을 즐길 수 있는 최적의 시기입니다.
      </p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-blue-100">
        <div className="bg-blue-600 p-3 text-white">
          <h3 className="text-lg font-semibold flex items-center">
            <Plane className="mr-2" size={20} />
            비행 일정
          </h3>
        </div>
        <div className="p-4">
          <div className="flex flex-col space-y-4">
            <div>
              <p className="text-sm text-gray-500">출발</p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">서울/인천 (터미널 2)</p>
                  <p className="text-sm">봄 시즌</p>
                  <p className="text-xs text-blue-600">대한항공</p>
                </div>
                <div className="text-blue-600">→</div>
                <div>
                  <p className="font-semibold">삿포로/치토세 (터미널 I)</p>
                  <p className="text-sm">봄 시즌</p>
                  <p className="text-xs">소요시간: 2시간 45분</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">귀국</p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">삿포로/치토세 (터미널 I)</p>
                  <p className="text-sm">봄 시즌</p>
                  <p className="text-xs text-blue-600">※ 출발 2시간 전 공항 도착</p>
                  <p className="text-xs text-blue-600">대한항공</p>
                </div>
                <div className="text-blue-600">→</div>
                <div>
                  <p className="font-semibold">서울/인천 (터미널 2)</p>
                  <p className="text-sm">봄 시즌</p>
                  <p className="text-xs">소요시간: 3시간 10분</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-blue-100">
        <div className="bg-blue-600 p-3 text-white">
          <h3 className="text-lg font-semibold flex items-center">
            <MapPin className="mr-2" size={20} />
            방문 지역
          </h3>
        </div>
        <div className="p-4">
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="bg-blue-100 rounded-full p-1 mr-3 mt-1">
                <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
              </div>
              <div>
                <p className="font-semibold">
                  <a 
                    href="https://welcome2k.tistory.com/entry/삿포로-관광지-완벽-가이드-놓치면-후회할-핫스팟-10선" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    삿포로
                  </a>
                </p>
                <p className="text-sm text-gray-600">
                  시계탑, 오도리 공원, TV타워, 니조 시장, 모이와 산, 삿포로 맥주 박물관
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-blue-100 rounded-full p-1 mr-3 mt-1">
                <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
              </div>
              <div>
                <p className="font-semibold">
                  <a 
                    href="https://winters-story.tistory.com/entry/오타루-여행코스" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    오타루
                  </a>
                </p>
                <p className="text-sm text-gray-600">
                  오타루 운하, 산카쿠 시장, 사카이마치 거리, 음악 상자 박물관
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-blue-100 mb-6">
      <div className="bg-blue-600 p-3 text-white">
        <h3 className="text-lg font-semibold flex items-center">
          <Sun className="mr-2" size={20} />
          날씨 및 준비물
        </h3>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-blue-800 mb-2">봄 시즌 날씨</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full p-1 mr-2">
                  <Sun size={16} />
                </span>
                <span>기온: 낮 15-20°C, 밤 7-12°C</span>
              </li>
              <li className="flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full p-1 mr-2">
                  <Cloud size={16} />
                </span>
                <span>강수: 간헐적 비, 습도 낮음</span>
              </li>
              <li className="flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full p-1 mr-2">
                  <Clock size={16} />
                </span>
                <span>일조시간: 이른 일출(4시 전), 늦은 일몰(7시 이후)</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-blue-800 mb-2">권장 복장</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="bg-blue-100 text-blue-800 rounded-full p-1 mr-2 mt-1">
                  <Check size={16} />
                </span>
                <span>기본: 긴팔 셔츠, 얇은 재킷/가디건, 긴바지</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 text-blue-800 rounded-full p-1 mr-2 mt-1">
                  <Check size={16} />
                </span>
                <span>신발: 편안한 워킹화/운동화(방수 기능 있으면 좋음)</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 text-blue-800 rounded-full p-1 mr-2 mt-1">
                  <Check size={16} />
                </span>
                <span>필수품: 접이식 우산, 얇은 스카프/숄(저녁용), 모자, 선글라스</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-blue-100">
      <div className="bg-blue-600 p-3 text-white">
        <h3 className="text-lg font-semibold flex items-center">
          <MapPin className="mr-2" size={20} />
          공항-삿포로 이동 (JR 래피드 공항 열차 확정)
        </h3>
      </div>
      <div className="p-4">
        <div className="mb-4 bg-blue-100 p-4 rounded-lg border-l-4 border-blue-600">
          <h4 className="font-bold text-blue-800 text-lg mb-2">✓ JR 래피드 공항 열차 (확정)</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <div>
              <p className="text-sm font-semibold text-gray-700">기본 정보</p>
              <ul className="text-sm space-y-1 text-gray-700 ml-4 list-disc">
                <li>소요시간: <span className="font-semibold">약 37분</span></li>
                <li>비용: <span className="font-semibold">1,150엔</span> (일반석)</li>
                <li>배차: 15분마다 한 대씩 (12:00, 12:15, 12:30...)</li>
                <li>승차 위치: 신치토세 공항 국내선 터미널 <span className="font-semibold">지하 1층</span></li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700">상세 이동 경로</p>
              <ul className="text-sm space-y-1 text-gray-700 ml-4 list-disc">
                <li>국제선 도착 게이트 → <span className="font-semibold">무빙워크</span>로 국내선 터미널 이동 (약 10분)</li>
                <li>국내선 터미널 도착 → <span className="font-semibold">지하 1층</span>으로 에스컬레이터/엘리베이터 이용</li>
                <li>JR 신치토세 공항역 개찰구에서 티켓 구매</li>
                <li>플랫폼에서 <span className="font-semibold">삿포로 방면</span> 열차 탑승</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
            <p className="text-sm font-semibold text-yellow-800 mb-1">알아두면 좋은 팁</p>
            <ul className="text-sm space-y-1 text-yellow-700 ml-4 list-disc">
              <li>국제선에서 JR역까지 약 10분 소요되므로 여유 있게 이동하세요</li>
              <li>열차 플랫폼은 좁은 편이고 많은 여행객이 이용하니 서둘러 탑승하세요</li>
              <li>JR 홋카이도 패스가 있다면 별도 티켓 구매 없이 바로 이용 가능합니다</li>
              <li>편안한 여행을 원하면 U시트(지정석) 이용 가능 (추가 530엔)</li>
            </ul>
          </div>
          
          <div className="mt-4 bg-red-50 p-3 rounded-lg border border-red-200">
            <p className="text-sm font-semibold text-red-800 mb-1">⚠️ 출국 시 주의사항</p>
            <ul className="text-sm space-y-1 text-red-700 ml-4 list-disc">
              <li><strong>국제선 출발 최소 2시간 전</strong>까지는 공항 체크인 카운터에 도착해야 합니다</li>
              <li>신치토세 공항 국제선 터미널은 국내선 터미널에서 도보로 약 10분 거리에 있습니다</li>
              <li>JR 래피드 열차는 배차 간격이 15분이므로, 일정에 여유를 두고 계획하세요</li>
              <li>체크인 후에도 보안 검색과 출국 심사에 시간이 소요될 수 있으니 충분한 시간을 확보하세요</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6">
          <h4 className="font-semibold text-blue-800 mb-3">삿포로역 도착 후 호텔 이동 경로</h4>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">1</div>
              <p className="font-semibold">JR 삿포로역 도착 (남쪽 출구 방향으로 이동)</p>
            </div>
            <div className="flex items-center mb-3">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">2</div>
              <p className="font-semibold">에스컬레이터 또는 엘리베이터로 1층 콘코스로 이동</p>
            </div>
            <div className="flex items-center mb-3">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">3</div>
              <p className="font-semibold">남쪽 출구로 나가 외부로 이동 (역 밖으로 나오기)</p>
            </div>
            <div className="flex items-center">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">4</div>
              <p className="font-semibold">포르자 삿포로 스테이션 호텔까지 도보 4분 (약 350m)</p>
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700">포르자 삿포로 스테이션 호텔(ホテルフォルツァ札幌駅前, Hotel Forza Sapporo Station)은 삿포로역 남쪽 출구에서 도보 4분 거리에 위치해 있으며, 편리한 접근성으로 인해 여행객들에게 인기가 많습니다. 호텔 체크인은 14:00부터 가능하지만, 그 전에 도착하시면 짐을 맡기고 바로 관광을 시작하실 수 있습니다.</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-gray-50 p-3 rounded-lg opacity-50">
            <h4 className="font-semibold text-gray-500 mb-1">리무진 버스 (선택하지 않음)</h4>
            <ul className="text-sm space-y-1 text-gray-500">
              <li>소요시간: 약 70분</li>
              <li>비용: 1,300엔</li>
              <li>배차: 30분마다</li>
              <li>특징: 주요 호텔 직접 정차</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg opacity-50">
            <h4 className="font-semibold text-gray-500 mb-1">택시 (선택하지 않음)</h4>
            <ul className="text-sm space-y-1 text-gray-500">
              <li>소요시간: 약 50분</li>
              <li>비용: 11,000~13,000엔</li>
              <li>이용: 24시간 가능</li>
              <li>특징: 호텔까지 직접 이동</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// 일정 계획 컴포넌트
const Schedule = ({ activeDay, setActiveDay }) => {
  const [detailsState, setDetailsState] = React.useState({});
  
  // 상세 정보 토글 함수
  const toggleDetails = (groupIdx, itemIdx) => {
    setDetailsState(prev => {
      const key = `${groupIdx}-${itemIdx}`;
      const currentState = prev[key] || false;
      return { ...prev, [key]: !currentState };
    });
  };
  
  const scheduleData = [
    {
      day: '1일차',
      date: '첫째날 (토)',
      title: '인천공항 출발 → 삿포로/치토세 공항 도착 & 삿포로',
      schedule: [
        {
          group: '인천공항 출발',
          items: [
            { time: '출발 5시간 전', activity: '서울에서 인천국제공항 제2터미널까지 이동', emoji: '🚗' },
            { time: '출발 3시간 전', activity: '출국 수속 및 공항 라운지로 이동', emoji: '🛂', details: '2터미널 출국층에서 수속을 마친 후 공항 라운지로 이동합니다.' },
            { time: '출발 2시간 전', activity: '면세점 쇼핑 및 식사', emoji: '🛍️' },
            { time: '출발 1시간 전', activity: '탑승구 도착 및 탑승 준비', emoji: '🚪' },
            { time: '출발', activity: '인천국제공항 출발 (대한항공)', emoji: '✈️' }
          ]
        },
        {
          group: '홋카이도 도착',
          items: [
            { 
              time: '도착', 
              activity: '삿포로/치토세 공항 도착 및 JR역으로 이동', 
              emoji: '🛬',
              details: '삿포로/치토세 공항 터미널 I에 도착 후 국제선에서 무빙워크로 국내선 터미널로 이동(10분)하여 지하 1층 JR역에서 삿포로행 티켓을 구매합니다. 치토세 공항은 홋카이도의 관문으로, 공항 내에는 다양한 쇼핑과 레스토랑이 있어 여행 시작부터 즐거움이 가득합니다.',
              blogLink: 'https://travel.hasummer.com/19'
            },
            { time: '도착 후 30분', activity: 'JR 래피드 열차로 삿포로 역으로 이동', emoji: '🚄' },
            { time: '도착 후 1시간', activity: '삿포로역 도착 및 호텔 체크인', emoji: '🏨' }
          ]
        },
        {
          group: '저녁 일정',
          items: [
            { time: '저녁', activity: '스스키노 지역 탐방 (삿포로 최대 유흥가)', emoji: '🏙️' },
            { time: '저녁 식사', activity: '미소라멘 식사', emoji: '🍜' },
            { time: '식사 후', activity: '호텔 복귀', emoji: '🏨' }
          ]
        }
      ],
      comment: '• 미소라멘(味噌ラーメン, 미소 라멘): 삿포로의 대표적인 라멘으로, 된장 기반의 진한 국물이 특징입니다.\n• 스스키노(すすきの, 스스키노): 홋카이도 최대의 유흥가로, 약 4,000개의 음식점, 바, 상점이 즐비한 지역입니다.\n• 공항 이동: 서울에서 인천공항까지는 교통 상황에 따라 다를 수 있으니 여유롭게 출발하세요.\n• 공항 라운지: 프리미엄 카드 소지자는 무료 이용 가능합니다. 인천공항 터미널에 위치하며, 식음료와 휴식 공간을 제공합니다.\n• 항공편: 인천-신치토세 직항 항공편으로 비행시간은 약 2시간 45분입니다.'
    },
    {
      day: '2일차',
      date: '둘째날 (일)',
      title: '삿포로 & 주변 명소 관광',
      schedule: [
        {
          group: '오전 일정',
          items: [
            { time: '07:30', activity: '호텔 조식', emoji: '🍳' },
            { time: '08:30', activity: '삿포로 중심부에서 마코마나이 타키노 묘지로 이동 (대중교통, 약 50분, 18km)', emoji: '🚌' },
            { 
              time: '09:10', 
              activity: '마코마나이 타키노 묘지(真駒内滝野霊園) - 대불상(Hill of Buddha) 관람 (입장료: 500엔)', 
              emoji: '🧘',
              details: '안도 타다오가 설계한 명상적인 공간으로, 거대한 부처상은 터널을 통과해야 만날 수 있는 신비로운 구조입니다. 자연과 명상, 예술이 조화를 이루는 공간으로 평화로운 시간을 보낼 수 있습니다. 방문객이 적은 오전에 방문하면 더욱 고요한 분위기를 느낄 수 있습니다.',
              blogLink: 'https://carpett5.tistory.com/entry/%EB%B6%81%ED%95%B4%EB%8F%84%ED%99%8B%EC%B9%B4%EC%9D%B4%EB%8F%84-%EC%97%AC%ED%96%89-%EA%B0%80%EC%9D%B4%EB%93%9C-%ED%8C%A8%ED%82%A4%EC%A7%80-%EC%97%AC%ED%96%89%EB%B6%80%ED%84%B0-%EC%9E%90%EC%9C%A0%EC%97%AC%ED%96%89%EA%B9%8C%EC%A7%80-%EC%99%84%EB%B2%BD-%EC%A0%95%EB%A6%AC'
            },
            { time: '10:40', activity: '대불상에서 모에레누마 공원으로 이동 (대중교통, 약 45분, 15km)', emoji: '🚌' },
            { 
              time: '11:15', 
              activity: '모에레누마 공원(モエレ沼公園) 관람 - 이사무 노구치가 설계한 공원 예술작품', 
              emoji: '🏞️',
              details: '이사무 노구치가 디자인한 거대한 예술 공원으로, 넓은 잔디밭과 독특한 조형물이 공원 전체에 펼쳐져 있습니다. 계절마다 다른 풍경을 즐길 수 있으며, 봄에는 잔디밭에서 피크닉을 즐기는 현지인들을 자주 볼 수 있습니다. 특히 유리 피라미드와 모에레 산에서의 전망이 인상적입니다.',
              blogLink: 'https://blog.naver.com/allin69_/223639621090'
            }
          ]
        },
        {
          group: '오후 일정',
          items: [
            { time: '13:00', activity: '모에레누마 공원 내 레스토랑에서 점심 식사', emoji: '🍱' },
            { time: '14:00', activity: '모에레누마 공원에서 삿포로 맥주 박물관으로 이동 (대중교통, 약 40분, 12km)', emoji: '🚌' },
            { 
              time: '14:30', 
              activity: '삿포로 맥주 박물관(サッポロビール博物館) 방문 (무료) 및 시음 (유료: 600엔)', 
              emoji: '🍺',
              details: '일본 최초의 맥주 브랜드 중 하나인 삿포로 맥주의 역사를 배울 수 있는 박물관입니다. 고풍스러운 벽돌 건물 내부에서 맥주 양조 과정을 배우고, 시음 코너에서는 갓 만든 신선한 맥주를 맛볼 수 있습니다. 600엔에 3종류의 맥주를 비교 시음할 수 있어 인기가 많습니다.',
              blogLink: 'https://blog.naver.com/hgejsh/223752566104'
            },
            { time: '15:30', activity: '맥주 가든에서 징기스칸(ジンギスカン) 양고기 바베큐 체험', emoji: '🍖' },
            { time: '17:00', activity: '맥주 박물관에서 삿포로 중심부로 이동 (대중교통, 약 15분)', emoji: '🚌' }
          ]
        },
        {
          group: '저녁 일정',
          items: [
            { time: '17:30', activity: '오도리 공원(大通公園) 산책 - 라일락 축제 잔여 행사 및 봄꽃 감상', emoji: '🌳' },
            { time: '18:30', activity: '탄키코지 쇼핑 거리 산책 및 쇼핑', emoji: '🛍️' },
            { time: '20:00', activity: '저녁 식사: 미소라멘 쥰렌(純連) 또는 현지 이자카야', emoji: '🍶' },
            { time: '21:30', activity: '호텔 복귀', emoji: '🏨' }
          ]
        }
      ],
      comment: '• 대불상(Hill of Buddha): 타다오 안도가 설계한 놀라운 건축물로, 터널을 통과해 나타나는 거대한 부처상이 인상적입니다. 삿포로에서 약 18km 떨어져 있으며, 지하철 남북선 마코마나이역에서 버스로 이동할 수 있습니다.\n• 모에레누마 공원(モエレ沼公園, Moerenuma Park): 유명한 예술가 이사무 노구치가 설계한 공원으로, 예술, 조각, 자연이 어우러진 공간입니다. 삿포로 중심부에서 약 12km 거리에 위치하며, 삿포로역 동쪽 버스터미널에서 버스로 약 40분 소요됩니다.\n• 삿포로 맥주 박물관 및 맥주 가든: 일본 최초의 맥주 브랜드 역사를 배우고 신선한 맥주를 맛볼 수 있는 곳으로, 삿포로 중심부에서 약 2km 거리에 있습니다. 도심에서 버스로 약 15분 소요됩니다.\n• 대중교통으로 3개 장소를 방문하는 일정이므로 이동 시간이 다소 소요되나, 삿포로 시내의 우수한 대중교통 시스템으로 모두 방문 가능합니다.'
    },
    {
      day: '3일차',
      date: '셋째날 (월)',
      title: '오타루 숙박 여행',
      schedule: [
        {
          group: '오전 일정',
          items: [
            { time: '08:00', activity: '호텔 조식 및 체크아웃', emoji: '🍳' },
            { time: '09:00', activity: 'JR 하코다테 본선으로 오타루 이동 (삿포로에서 30분, 800엔)', emoji: '🚄' },
            { 
              time: '09:45', 
              activity: '오타루 운하(小樽運河) 산책', 
              emoji: '⛵',
              details: '메이지 시대에 만들어진 오타루 운하는 현재 오타루의 상징적인 풍경이 되었습니다. 석조 창고들이 운하를 따라 줄지어 있고, 가스등이 로맨틱한 분위기를 더합니다. 아침 일찍 방문하면 관광객이 적어 고요한 운하의 풍경을 즐길 수 있습니다. 계절마다 다른 매력이 있지만, 봄의 선선한 바람을 맞으며 산책하기 좋습니다.',
              blogLink: 'https://winters-story.tistory.com/entry/오타루-여행코스'
            }
          ]
        },
        {
          group: '오후 일정',
          items: [
            { time: '12:00', activity: '산카쿠 시장(三角市場)에서 점심 - 타키나미 쇼쿠도(瀧波食堂)의 해산물 덮밥', emoji: '🦞' },
            { 
              time: '13:30', 
              activity: '사카이마치 거리 탐방 - 오타루 음악 상자 박물관, 키타이치 글라스 등', 
              emoji: '🎵',
              details: '오타루에서 가장 인기 있는 쇼핑거리로, 다양한 유리 공예품과 음악 상자 등의 공예품을 판매하는 상점들이 즐비합니다. 오타루 음악 상자 박물관은 무료로 입장 가능하며, 음악 상자 연주회도 볼 수 있습니다. 키타이치 글라스에서는 유리 공예 시연을 관람하거나 체험 프로그램에 참여할 수도 있습니다.',
              blogLink: 'https://winters-story.tistory.com/entry/오타루-여행코스'
            },
            { time: '15:30', activity: '르타오 본점에서 디저트 - 치즈케이크와 홋카이도 우유 디저트', emoji: '🍰' },
            { time: '16:30', activity: '그리드 프리미엄 호텔 오타루 체크인', emoji: '🏨' }
          ]
        },
        {
          group: '저녁 일정',
          items: [
            { time: '18:30', activity: '오타루 운하 야경 산책', emoji: '🌃' },
            { time: '19:30', activity: '오타루 현지 해산물 요리점에서 저녁', emoji: '🦑' },
            { time: '21:00', activity: '호텔 복귀 및 휴식', emoji: '🏨' }
          ]
        }
      ],
      comment: '• 오타루 운하(小樽運河, Otaru Canal): 메이지 시대부터 물류 운송에 사용되던 운하로, 현재는 오타루의 대표적인 관광지입니다. 야경이 특히 아름다워 저녁 산책이 추천됩니다.\n• 사카이마치 거리(堺町通り, Sakaimachi Street): 유리 공예품과 음악 상자로 유명한 거리로, 다양한 공방과 상점이 있습니다.\n• 르타오(LeTAO): 오타루에서 시작된 유명한 디저트 브랜드로, 더블 프롬마주 치즈케이크가 대표 메뉴입니다.\n• 그리드 프리미엄 호텔 오타루는 아카이와 지역에 위치한 4성급 호텔로 2022년에 개장한 현대적인 시설을 갖추고 있으며, 대중목욕탕(온천)과 훌륭한 조식으로 평가가 좋습니다.'
    },
    {
      day: '4일차',
      date: '넷째날 (화)',
      title: '오타루 마지막 탐방 및 귀국',
      schedule: [
        {
          group: '오전 일정',
          items: [
            { time: '07:00', activity: '호텔 조식 및 체크아웃', emoji: '🍳' },
            { time: '08:00', activity: '오타루 아침 산책 - 이른 아침 관광객이 적은 운하 감상', emoji: '🌞' },
            { 
              time: '09:30', 
              activity: 'JR 하코다테 본선으로 삿포로 이동 (30분, 800엔)', 
              emoji: '🚄'
            },
            { time: '10:15', activity: '삿포로 역 도착 및 짐 보관', emoji: '🧳' },
            { 
              time: '10:45', 
              activity: '시로이 코이비토 파크 방문 및 점심 - 유명한 홋카이도 과자 공장 견학 (입장료: 600엔, 영업시간: 09:00-18:00)', 
              emoji: '🍪',
              details: '"하얀 연인"이라는 뜻의 화이트 초콜릿 샌드 쿠키로 유명한 이시야 제과의 테마파크입니다. 쿠키 제조 과정을 관람하고, 쿠키 만들기 체험(예약 필요)도 가능합니다. 공원 내에는 레스토랑과 카페가 있어 점심 식사와 디저트를 함께 즐길 수 있습니다. 기념품점에서는 일반 상점보다 다양한 종류의 과자를 구매할 수 있습니다.',
              blogLink: 'https://blog.naver.com/daun1217/223184618395'
            }
          ]
        },
        {
          group: '공항 이동',
          items: [
            { time: '12:30', activity: '시로이 코이비토 파크에서 짐 찾기', emoji: '🧳' },
            { time: '13:00', activity: '삿포로/치토세 공항 국제선 터미널로 이동', emoji: '🚄', 
              details: '삿포로역 지하 1층 개찰구에서 치토세행 티켓을 구매하고 JR 래피드 열차로 공항까지 이동(37분)한 다음, 공항역에서 국제선 터미널로 이동(10분)합니다.' }
          ]
        },
        {
          group: '귀국 준비',
          items: [
            { time: '14:30-15:00', activity: '국제선 출국장 도착, 체크인 및 출국 심사', emoji: '🛂' },
            { time: '15:00', activity: '삿포로/치토세 공항 라운지 이용 (출국장 내 라운지)', emoji: '🍹' },
            { time: '15:30', activity: '면세점 쇼핑 및 탑승 준비', emoji: '🛍️' },
            { time: '16:00', activity: '탑승구 도착', emoji: '🚪' },
            { time: '16:20', activity: '비행기 탑승 (대한항공)', emoji: '✈️' },
            { time: '19:30', activity: '인천 도착 (제2터미널)', emoji: '🛬' }
          ]
        }
      ],
      comment: '• 오타루 아침: 이른 아침의 오타루는 관광객이 적고 고요한 분위기에서 운하와 역사적인 건물들을 감상할 수 있는 특별한 시간입니다.\n• 시로이 코이비토(白い恋人, 시로이 코이비토): "하얀 연인"이라는 뜻의 홋카이도 대표 과자로, 화이트 초콜릿을 샌드한 쿠키입니다.\n• 공항 라운지: 프리미엄 카드 소지자는 무료 이용 가능합니다. 출발 2시간 전까지 체크인 후 라운지를 이용할 수 있으며, 식음료와 휴식 공간을 제공합니다.\n• JR 열차: 오타루에서 삿포로까지는 약 30분, 삿포로에서 신치토세 공항까지는 약 37분이 소요됩니다. 배차 간격은 피크 시간대에 10~15분 정도로 빠른 편입니다.\n• 대한항공: 소요시간 약 3시간, 인천공항 제2터미널에 도착합니다.'
    }
  ];
  
  const currentSchedule = scheduleData[activeDay - 1];
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-800 mb-4">일정 계획</h2>
      
      <div className="flex mb-4 overflow-x-auto">
        {scheduleData.map((day, index) => (
          <button
            key={index}
            className={`flex-1 min-w-32 py-3 px-3 text-center font-semibold transition-all border-b-2 ${
              activeDay === index + 1
                ? 'border-blue-600 text-blue-800 bg-blue-50'
                : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50'
            }`}
            onClick={() => setActiveDay(index + 1)}
          >
            <div className="text-sm">{day.day}</div>
            <div className="text-xs text-gray-500">{day.date}</div>
          </button>
        ))}
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h3 className="text-xl font-bold text-blue-800">{currentSchedule.title}</h3>
        <p className="text-sm text-gray-600">{currentSchedule.date}</p>
      </div>
      
      <div className="space-y-6 mb-6">
        {currentSchedule.schedule.map((group, groupIdx) => (
          <div key={groupIdx} className="overflow-hidden rounded-xl border border-gray-200">
            <div className="bg-blue-600 py-2 px-4">
              <h3 className="text-white font-semibold">{group.group}</h3>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider w-1/4">시간</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider w-3/4">활동</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {group.items.map((item, idx) => {
                  // 상세 정보 상태 확인 및 설정
                  const detailKey = `${groupIdx}-${idx}`;
                  const showDetails = detailsState[detailKey] || false;
                  const itemWithDetails = { ...item, showDetails };
                  
                  return (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white mr-3">
                            {idx + 1}
                          </div>
                          {itemWithDetails.time}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        <div className="flex items-center">
                          <span className="text-xl mr-2">{itemWithDetails.emoji}</span>
                          {itemWithDetails.activity}
                          {itemWithDetails.details && (
                            <button
                              className="ml-2 text-blue-500 hover:text-blue-700"
                              onClick={() => toggleDetails(groupIdx, idx)}
                              aria-label="상세 정보 토글"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </button>
                          )}
                        </div>
                        {itemWithDetails.details && itemWithDetails.showDetails && (
                          <div className="mt-2 ml-8 p-3 bg-gray-50 rounded-md border border-gray-200 text-xs">
                            <p className="mb-2">{itemWithDetails.details}</p>
                            {itemWithDetails.blogLink && (
                              <a
                                href={itemWithDetails.blogLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline flex items-center"
                                aria-label="관련 블로그 포스트로 이동"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                블로그 더 보기
                              </a>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">참고사항</h4>
        <div className="text-sm text-gray-700 whitespace-pre-line">
          {currentSchedule.comment}
        </div>
      </div>
    </div>
  );
};

// Schedule Props 타입 정의
Schedule.propTypes = {
  activeDay: PropTypes.number.isRequired,
  setActiveDay: PropTypes.func.isRequired
};

// 홋카이도 음식 컴포넌트
const Food = ({ activeFood, setActiveFood }) => {
  const foodCategories = [
    { id: 'seafood', name: '해산물', icon: '🦞' },
    { id: 'specialty', name: '홋카이도 특선', icon: '🍖' },
    { id: 'ramen', name: '라멘', icon: '🍜' },
    { id: 'dessert', name: '디저트/유제품', icon: '🍰' },
    { id: 'seasonal', name: '제철 음식', icon: '🌱' }
  ];
  
  const foodData = {
    seafood: [
      {
        name: '가이센돈 (海鮮丼)',
        description: '신선한 해산물을 밥 위에 올린 덮밥',
        restaurants: ['니조 시장의 오히소(おひそ)', '돈부리 차야(丼チャヤ)', '산카쿠 시장의 타키나미 쇼쿠도(瀧波食堂)'],
        tips: '5월~6월은 성게(우니)가 가장 맛있는 시기로, 성게 덮밥을 꼭 맛보세요.',
        image: '🦞',
        link: 'https://www.instagram.com/explore/tags/海鮮丼/'
      },
      {
        name: '우니 (성게알, うに)',
        description: '홋카이도에서 가장 유명한 해산물 중 하나',
        restaurants: ['우니 무라카미(ウニ むらかみ)', '니조 시장 내 해산물 전문점'],
        tips: '봄 시즌이 절정기, 보존료 없는 신선한 성게 덮밥이나 성게 그라탕을 추천',
        image: '🌊',
        link: 'https://www.instagram.com/explore/tags/うに/'
      },
      {
        name: '게 요리',
        description: '홋카이도 특산 게를 다양한 방식으로 요리',
        restaurants: ['간지야 스스키노점 (蟹屋すすきの店)', '니조 시장 내 게 전문점'],
        tips: '타라바가니(왕게)와 즈와이가니(대게)가 유명하며, 찜, 샤브샤브, 튀김 등으로 즐길 수 있습니다.',
        image: '🦀',
        link: 'https://www.instagram.com/explore/tags/홋카이도게/'
      },
    ],
    specialty: [
      {
        name: '징기스칸 (ジンギスカン)',
        description: '양고기 바베큐, 홋카이도의 대표 요리',
        restaurants: ['삿포로 맥주 가든', '다루마(だるま)', '다이코쿠야(大黒屋)'],
        tips: '특별한 모양의 철판에 양고기와 야채를 함께 구워 먹는 특색있는 요리입니다.',
        image: '🍖',
        link: 'https://www.instagram.com/explore/tags/ジンギスカン/'
      },
      {
        name: '스프 카레 (スープカレー)',
        description: '삿포로 특산 수프형 카레',
        restaurants: ['가라쿠(ガラク)', '트레져(トレジャー)', '사무라이(サムライ)'],
        tips: '일반 카레와 달리 수프 형태이며, 다양한 토핑과 매운맛 단계를 선택할 수 있습니다.',
        image: '🍛',
        link: 'https://www.instagram.com/explore/tags/スープカレー/'
      },
    ],
    ramen: [
      {
        name: '삿포로 미소 라멘',
        description: '된장 베이스의 진한 국물, 버터와 옥수수 토핑',
        restaurants: ['라멘 신겐(しんげん)', '미소라멘 쥰렌(純連)', '요코초 라멘'],
        tips: '삿포로식 미소 라멘은 된장 베이스에 버터와 옥수수 토핑이 특징입니다.',
        image: '🍜',
        link: 'https://www.instagram.com/explore/tags/味噌ラーメン/'
      },
      {
        name: '아사히카와 쇼유 라멘',
        description: '간장 베이스의 깔끔한 국물과 숯불구이 챠슈',
        restaurants: ['아오바(青葉)', '아수라(阿修羅)'],
        tips: '숯불구이한 챠슈와 강한 마늘 풍미가 특징입니다.',
        image: '🍜',
        link: 'https://www.instagram.com/explore/tags/旭川ラーメン/'
      },
      {
        name: '하코다테 시오 라멘',
        description: '소금 베이스의 담백한 국물',
        restaurants: ['아지노산페이(あじのさんぺい)', '하코다테 메구미(はこだて恵)'],
        tips: '담백한 해산물 육수와 함께 맑고 깔끔한 맛이 특징입니다.',
        image: '🍜',
        link: 'https://www.instagram.com/explore/tags/塩ラーメン/'
      },
    ],
    dessert: [
      {
        name: '르타오 치즈케이크',
        description: '오타루의 유명한 치즈케이크',
        restaurants: ['르타오(LeTAO) 본점', '오타루 본점'],
        tips: '더블 프롬마주가 가장 유명하며, 두 층의 다른 치즈 풍미를 즐길 수 있습니다.',
        image: '🧀',
        link: 'https://www.letao.jp/'
      },
      {
        name: '시로이 코이비토',
        description: '화이트 초콜릿 샌드 쿠키',
        restaurants: ['시로이 코이비토 파크'],
        tips: '"하얀 연인"이라는 뜻으로, 홋카이도에서 가장 유명한 과자 중 하나입니다.',
        image: '🍪',
        link: 'https://blog.naver.com/daun1217/223184618395'
      },
      {
        name: '홋카이도 아이스크림',
        description: '풍부한 유제품으로 만든 프리미엄 아이스크림',
        restaurants: ['밀크 빌리지(밀크무라/ミルク村)', '미르쿠 고보(우유공방/ミルク工房)'],
        tips: '홋카이도는 일본 유제품의 약 50%를 생산하는 지역으로, 특히 우유와 아이스크림이 유명합니다.',
        image: '🍦',
        link: 'https://www.instagram.com/explore/tags/北海道アイスクリーム/'
      },
    ],
    seasonal: [
      {
        name: '봄 아스파라거스',
        description: '5월~6월 제철인 홋카이도 특산 아스파라거스',
        restaurants: ['계절 메뉴로 제공하는 대부분의 일식당', '토레타고야 후지이 팜(トレタ小屋)'],
        tips: '니세코 산기슭에서 재배되며, 눈 녹은 후 영양분을 흡수하여 단맛이 강합니다.',
        image: '🌱',
        link: 'https://www.instagram.com/explore/tags/北海道アスパラ/'
      },
      {
        name: '봄 산나물 (山菜/산사이)',
        description: '눈 녹은 후 자라는 다양한 봄나물',
        restaurants: ['니조 시장', '계절 메뉴 제공하는 일식당'],
        tips: '곰취순(후키노토우/フキノトウ), 산마늘(교우자닌니쿠/ギョウジャニンニク), 미나리(세리/セリ) 등이 인기 있습니다.',
        image: '🌿',
        link: 'https://www.instagram.com/explore/tags/山菜/'
      },
    ]
  };
  
  const selectedFoodItems = foodData[activeFood];
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-800 mb-4">홋카이도 특색 음식</h2>
      
      <div className="flex mb-6 overflow-x-auto">
        {foodCategories.map((category) => (
          <button
            key={category.id}
            className={`flex-1 min-w-28 py-3 px-2 text-center font-semibold transition-all ${
              activeFood === category.id
                ? 'bg-blue-600 text-white rounded-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md mx-1'
            }`}
            onClick={() => setActiveFood(category.id)}
          >
            <span className="block text-xl mb-1">{category.icon}</span>
            <span className="text-sm">{category.name}</span>
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {selectedFoodItems.map((food, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-blue-100">
            <div className="bg-blue-600 p-3 text-white flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-2xl mr-2">{food.image}</span>
                <h3 className="text-lg font-semibold">{food.name}</h3>
              </div>
              <a 
                href={food.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-blue-600 p-1 rounded-full hover:bg-blue-50 transition-colors"
              >
                <Instagram size={16} />
              </a>
            </div>
            <div className="p-4">
              <p className="text-gray-700 mb-3">{food.description}</p>
              
              <div className="mb-3">
                <h4 className="font-semibold text-blue-800 mb-1">추천 식당</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
                  {food.restaurants.map((restaurant, idx) => (
                    <li key={idx}>{restaurant}</li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-yellow-50 p-3 rounded-md">
                <h4 className="font-semibold text-yellow-800 mb-1">알아두면 좋은 팁</h4>
                <p className="text-sm text-yellow-800">{food.tips}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {activeFood === 'seafood' && (
        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">해산물 제철 정보</h3>
          <p className="text-gray-700 text-sm mb-2">
            봄 시즌은 홋카이도에서 다음 해산물이 가장 맛있는 시기입니다:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
            <li>성게(우니/うに): 봄 시즌이 절정기</li>
            <li>가리비(帆立/호타테): 4~6월이 살이 통통하게 오르는 시기</li>
            <li>연어(サーモン/사몬): 봄철 연어는 기름기가 적당하여 담백</li>
            <li>털게(毛蟹/케가니): 봄에 가장 맛있음</li>
          </ul>
        </div>
      )}
    </div>
  );
};

// Food Props 타입 정의
Food.propTypes = {
  activeFood: PropTypes.string.isRequired,
  setActiveFood: PropTypes.func.isRequired
};

// 숙소 정보 컴포넌트
const HotelInfo = () => {
  const hotels = [
    {
      name: '호텔 포르자 삿포로 스테이션',
      type: '미드레인지',
      location: 'JR 삿포로 역 남쪽 출구에서 도보 4분',
      features: ['객실 넓음', '최신 시설', '대중교통 접근성 우수'],
      price: '아고다 평점 9.0/10',
      priceInfo: '위치 9.4/10, 청결도 9.4/10 (최고)',
      rooms: ['더블룸 논스모킹'],
      facilities: ['무료 Wi-Fi', '비즈니스 센터', '세탁 서비스', '조식 제공(유료)'],
      pros: ['삿포로 역 근처로 교통이 편리', '깨끗하고 현대적인 시설', '가성비 좋음'],
      reservationNumber: '******',
      image: '🏨',
      bookingStatus: '예약 완료'
    },
    {
      name: '그리드 프리미엄 호텔 오타루',
      type: '4성급',
      location: '오타루, 아카이와 지역 중심부',
      features: ['2022년 개장', '현대적 시설', '온천/대중목욕탕', '우수한 조식'],
      price: '아고다 평점 8.9/10',
      priceInfo: '위치 9.0/10, 청결도 9.4/10 (우수)',
      rooms: ['소형 트윈룸'],
      facilities: ['무료 Wi-Fi', '온천/대중목욕탕', '레스토랑', '24시간 프론트'],
      pros: ['현대적 시설', '온천/대중목욕탕 구비', '청결도 높음', '조식 평가 우수'],
      reservationNumber: '******',
      image: '🏨',
      bookingStatus: '예약 완료'
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-800 mb-4">숙박 계획 및 추천 숙소</h2>
      
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          이번 여행은 삿포로에서 2박, 오타루에서 1박하는 일정입니다. 삿포로는 홋카이도의 교통 중심지로 주변 명소를 방문하기 편리하며, 오타루는 석조 창고와 운하가 있는 아름다운 항구 도시로 야경과 이른 아침 풍경이 매력적입니다. 두 호텔 모두 역에서 가깝고 편의 시설이 잘 갖추어져 있어 여행의 베이스캠프로 이상적입니다.
        </p>
      </div>
      
      <div className="bg-green-50 p-4 rounded-lg mb-6 border border-green-200">
        <h3 className="font-semibold text-green-800 mb-2">최종 확정된 숙소</h3>
        <div className="space-y-3">
          <div className="flex items-center">
            <span className="text-3xl mr-3">✅</span>
            <div>
              <p className="font-bold text-green-800">호텔 포르자 삿포로 스테이션 (Hotel Forza Sapporo Station)</p>
              <p className="text-sm text-gray-700">JR 삿포로 역 남쪽 출구에서 도보 4분</p>
              <p className="text-sm text-gray-700">봄 시즌 첫째날~셋째날 (2박)</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <span className="text-3xl mr-3">✅</span>
            <div>
              <p className="font-bold text-green-800">그리드 프리미엄 호텔 오타루 (GRIDS PREMIUM HOTEL OTARU)</p>
              <p className="text-sm text-gray-700">오타루 아카이와 지역 중심부</p>
              <p className="text-sm text-gray-700">봄 시즌 셋째날~넷째날 (1박)</p>
            </div>
          </div>
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-blue-800 mb-4">삿포로 숙소 - 포르자 삿포로 스테이션</h3>
      
      <div className="grid grid-cols-1 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-blue-100">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 bg-blue-600 p-6 flex items-center justify-center">
              <div className="text-white text-6xl">{hotels[0].image}</div>
            </div>
            
            <div className="w-full md:w-2/3 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-blue-800">{hotels[0].name}</h3>
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-1">{hotels[0].type}</span>
                </div>
                <div className="text-right">
                  <div className="text-blue-800 font-bold">{hotels[0].price}</div>
                  <div className="text-xs text-gray-500">{hotels[0].priceInfo}</div>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-blue-800 mb-1">위치</h4>
                  <p className="text-sm text-gray-700">{hotels[0].location}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-blue-800 mb-1">특징</h4>
                  <ul className="list-disc pl-5 text-sm text-gray-700">
                    {hotels[0].features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-blue-800 mb-1">객실 타입</h4>
                  <p className="text-sm text-gray-700">{hotels[0].rooms.join(', ')}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-blue-800 mb-1">편의시설</h4>
                  <p className="text-sm text-gray-700">{hotels[0].facilities.join(', ')}</p>
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="font-semibold text-blue-800 mb-1">장점</h4>
                <div className="flex flex-wrap gap-2">
                  {hotels[0].pros.map((pro, i) => (
                    <span key={i} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      {pro}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold text-blue-800 mb-1">예약 상태</h4>
                <div className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                  {hotels[0].bookingStatus}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-bold text-blue-800 mb-4">오타루 숙소 - 그리드 프리미엄 호텔 오타루</h3>
      
      <div className="grid grid-cols-1 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-indigo-100">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 bg-indigo-600 p-6 flex items-center justify-center">
              <div className="text-white text-6xl">{hotels[1].image}</div>
            </div>
            
            <div className="w-full md:w-2/3 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-indigo-800">{hotels[1].name}</h3>
                  <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full mt-1">{hotels[1].type}</span>
                </div>
                <div className="text-right">
                  <div className="text-indigo-800 font-bold">{hotels[1].price}</div>
                  <div className="text-xs text-gray-500">{hotels[1].priceInfo}</div>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-indigo-800 mb-1">위치</h4>
                  <p className="text-sm text-gray-700">{hotels[1].location}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-indigo-800 mb-1">특징</h4>
                  <ul className="list-disc pl-5 text-sm text-gray-700">
                    {hotels[1].features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-indigo-800 mb-1">객실 타입</h4>
                  <p className="text-sm text-gray-700">{hotels[1].rooms.join(', ')}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-indigo-800 mb-1">편의시설</h4>
                  <p className="text-sm text-gray-700">{hotels[1].facilities.join(', ')}</p>
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="font-semibold text-indigo-800 mb-1">장점</h4>
                <div className="flex flex-wrap gap-2">
                  {hotels[1].pros.map((pro, i) => (
                    <span key={i} className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                      {pro}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold text-indigo-800 mb-1">예약 상태</h4>
                <div className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                  {hotels[1].bookingStatus}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-2">호텔 간 이동 정보</h3>
        <p className="text-gray-700 mb-3">
          삿포로에서 오타루까지는 JR 하코다테 본선을 이용해 약 30분이면 이동 가능합니다. 기차는 매우 자주 운행되며 편도 요금은 약 800엔입니다.
        </p>
        <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
          <li>첫차: 오전 5시경부터 운행 시작</li>
          <li>막차: 자정 전까지 운행</li>
          <li>배차 간격: 피크 시간대 10~15분, 비피크 시간대 20~30분</li>
          <li>소요시간: 약 30분 (급행 기준)</li>
          <li>체크아웃 후 짐은 택배 서비스(타큐빈)를 이용해 다음 호텔로 보낼 수 있습니다.</li>
        </ul>
      </div>
      
      <div className="mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <h3 className="font-semibold text-yellow-800 mb-2">예약 팁</h3>
        <ul className="list-disc pl-5 space-y-2 text-yellow-800 text-sm">
          <li>봄 시즌은 성수기 직전의 좋은 시기이나, 이 일정에 맞게 최소 2-3개월 전에 예약하는 것이 좋습니다.</li>
          <li>일본 호텔은 체크인 시간이 대부분 15:00 이후이고, 체크아웃은 10:00-11:00입니다.</li>
          <li>호텔 공식 웹사이트로 직접 예약하면 종종 추가 혜택이나 회원 할인을 받을 수 있습니다.</li>
          <li>예약 전에 취소 정책을 꼭 확인하세요. 일부 저렴한 요금은 취소/변경이 불가능할 수 있습니다.</li>
          <li>체크인 당일 일찍 도착할 경우, 대부분의 호텔에서 짐을 미리 맡길 수 있습니다.</li>
        </ul>
      </div>
    </div>
  );
};

// 유용한 일본어 표현 컴포넌트
const Phrases = ({ activePhraseCategory, setActivePhraseCategory }) => {
  const phraseCategories = [
    { id: 'basic', name: '기본 인사', icon: '👋' },
    { id: 'restaurant', name: '식당에서', icon: '🍽️' },
    { id: 'shopping', name: '쇼핑할 때', icon: '🛍️' },
    { id: 'transportation', name: '교통/이동', icon: '🚆' },
    { id: 'hokkaido', name: '홋카이도 방언', icon: '❄️' }
  ];
  
  const phraseData = {
    basic: [
      { japanese: 'こんにちは', romanization: '콘니치와', korean: '안녕하세요' },
      { japanese: 'おはようございます', romanization: '오하요 고자이마스', korean: '안녕하세요 (아침)' },
      { japanese: 'こんばんは', romanization: '콘반와', korean: '안녕하세요 (저녁)' },
      { japanese: 'ありがとうございます', romanization: '아리가토 고자이마스', korean: '감사합니다' },
      { japanese: 'すみません', romanization: '스미마센', korean: '실례합니다/죄송합니다' },
      { japanese: 'はい / いいえ', romanization: '하이 / 이이에', korean: '네 / 아니오' },
      { japanese: 'お願いします', romanization: '오네가이시마스', korean: '부탁합니다' },
      { japanese: 'さようなら', romanization: '사요나라', korean: '안녕히 계세요/가세요' },
    ],
    restaurant: [
      { japanese: 'おいしい', romanization: '오이시이', korean: '맛있습니다' },
      { japanese: 'メニューをください', romanization: '메뉴오 쿠다사이', korean: '메뉴판 주세요' },
      { japanese: 'お水をください', romanization: '오미즈오 쿠다사이', korean: '물 주세요' },
      { japanese: 'お会計お願いします', romanization: '오카이케이 오네가이시마스', korean: '계산해주세요' },
      { japanese: 'いただきます', romanization: '이타다키마스', korean: '잘 먹겠습니다 (식사 전)' },
      { japanese: 'ごちそうさまでした', romanization: '고치소사마 데시타', korean: '잘 먹었습니다 (식사 후)' },
      { japanese: 'これは何ですか', romanization: '코레와 난데스카', korean: '이것은 무엇인가요?' },
      { japanese: '予約しています', romanization: '요야쿠 시테이마스', korean: '예약했습니다' },
    ],
    shopping: [
      { japanese: 'いくらですか', romanization: '이쿠라데스카', korean: '얼마인가요?' },
      { japanese: 'これをください', romanization: '코레오 쿠다사이', korean: '이것 주세요' },
      { japanese: '試着できますか', romanization: '시챠쿠 데키마스카', korean: '시착 가능한가요?' },
      { japanese: 'クレジットカードは使えますか', romanization: '쿠레짓토 카도와 츠카에마스카', korean: '신용카드 사용 가능한가요?' },
      { japanese: '安くできますか', romanization: '야스쿠 데키마스카', korean: '싸게 할 수 있나요?' },
      { japanese: '免税できますか', romanization: '멘제이 데키마스카', korean: '면세 가능한가요?' },
      { japanese: 'レシートをください', romanization: '레시토오 쿠다사이', korean: '영수증 주세요' },
    ],
    transportation: [
      { japanese: '〜はどこですか', romanization: '~와 도코데스카', korean: '〜는 어디인가요?' },
      { japanese: '〜に行きたいです', romanization: '~니 이키타이데스', korean: '〜에 가고 싶습니다' },
      { japanese: '駅はどこですか', romanization: '에키와 도코데스카', korean: '역은 어디인가요?' },
      { japanese: '切符はどこで買えますか', romanization: '킷푸와 도코데 카에마스카', korean: '표는 어디서 살 수 있나요?' },
      { japanese: 'これは〜行きですか', romanization: '코레와 ~이키데스카', korean: '이것은 〜행 인가요?' },
      { japanese: '次の停車駅は何ですか', romanization: '츠기노 테이샤에키와 난데스카', korean: '다음 정차역은 무엇인가요?' },
      { japanese: 'タクシーを呼んでください', romanization: '탁시오 욘데 쿠다사이', korean: '택시를 불러주세요' },
    ],
    hokkaido: [
      { japanese: 'なまら', romanization: '나마라', korean: '매우/굉장히 (표준어: とても/토테모)', explanation: '홋카이도에서 "매우" 또는 "굉장히"라는 의미로 사용되는 방언' },
      { japanese: 'しばれる', romanization: '시바레루', korean: '춥다 (표준어: 寒い/사무이)', explanation: '매우 추울 때 사용하는 방언으로, 문자 그대로는 "얼어붙다"라는 의미' },
      { japanese: 'したっけ', romanization: '시탓케', korean: '안녕히 가세요 (표준어: さようなら/사요나라)', explanation: '헤어질 때 사용하는 인사말' },
      { japanese: 'めんこい', romanization: '멘코이', korean: '귀엽다 (표준어: 可愛い/카와이)', explanation: '귀엽다는 의미의 홋카이도 방언' },
      { japanese: 'あずましい', romanization: '아즈마시이', korean: '기분 좋다/편안하다 (표준어: 気持ちいい/키모치이)', explanation: '날씨나 환경이 쾌적하고 기분 좋을 때 사용' },
      { japanese: 'ごしょうな', romanization: '고쇼나', korean: '맛있다 (표준어: おいしい/오이시이)', explanation: '음식이 맛있을 때 사용하는 표현' },
    ]
  };
  
  const selectedPhrases = phraseData[activePhraseCategory];
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-800 mb-4">알아두면 좋은 일본어 표현</h2>
      
      <div className="flex mb-6 overflow-x-auto">
        {phraseCategories.map((category) => (
          <button
            key={category.id}
            className={`flex-1 min-w-28 py-3 px-2 text-center font-semibold transition-all ${
              activePhraseCategory === category.id
                ? 'bg-blue-600 text-white rounded-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md mx-1'
            }`}
            onClick={() => setActivePhraseCategory(category.id)}
          >
            <span className="block text-xl mb-1">{category.icon}</span>
            <span className="text-sm">{category.name}</span>
          </button>
        ))}
      </div>
      
      <div className="overflow-hidden rounded-xl border border-gray-200 mb-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider w-1/4">일본어</th>
              <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider w-1/4">발음</th>
              <th className="px-4 py-3 text-left text-sm font-medium uppercase tracking-wider w-1/2">한국어 의미</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {selectedPhrases.map((phrase, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-blue-50'}>
                <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-gray-900">
                  {phrase.japanese}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700 italic">
                  {phrase.romanization}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {phrase.korean}
                  {phrase.explanation && (
                    <p className="text-xs text-gray-500 mt-1">{phrase.explanation}</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {activePhraseCategory === 'hokkaido' && (
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">홋카이도 방언에 대해</h3>
          <p className="text-sm text-gray-700">
            홋카이도 방언(北海道弁, 홋카이도벤)은 다른 일본 지역과 비교적 신규 이주자들로 형성된 지역 특성상 표준어에 가까운 편이지만, 몇 가지 독특한 표현들이 있습니다. 이 표현들을 사용하면 현지인들과 더 친근하게 소통할 수 있습니다. 특히 날씨나 음식에 관한 표현이 많아 여행 중에 사용하기 좋습니다.
          </p>
        </div>
      )}
    </div>
  );
};

// Phrases Props 타입 정의
Phrases.propTypes = {
  activePhraseCategory: PropTypes.string.isRequired,
  setActivePhraseCategory: PropTypes.func.isRequired
};

// 흥미로운 정보 컴포넌트
const Facts = () => {
  const [activeFactCategory, setActiveFactCategory] = useState('hokkaido');
  
  const factCategories = [
    { id: 'hokkaido', name: '홋카이도 정보', icon: '❄️' },
    { id: 'ainu', name: '아이누 문화', icon: '🏞️' },
    { id: 'culture', name: '현지 문화', icon: '🎎' },
    { id: 'travel', name: '여행 팁', icon: '🧳' }
  ];
  
  const factsData = {
    hokkaido: [
      {
        title: '홋카이도 명칭의 유래',
        content: '1869년 이전에는 \'에조\'(蝦夷)라고 불렸으며, 현재 명칭은 1869년에 공식 지정되었습니다. \'홋카이\' 는 아이누어로 \'북쪽의 바다\', \'도\'는 일본어로 \'지역\'이나 \'섬\'을 의미합니다.',
        link: 'https://www.visit-hokkaido.jp/kr/'
      },
      {
        title: '미국의 영향',
        content: '1868년 메이지 유신 이후 미국 농업 전문가 호레이스 캐프론이 홋카이도 개발을 도왔습니다. 이로 인해 삿포로는 격자형 도시 계획과 서양식 농업 기술을 도입했으며, 일본 최초의 맥주 양조장도 설립되었습니다.',
        link: 'https://blog.naver.com/naverschool/222715269265'
      },
      {
        title: '격자형 도시',
        content: '삿포로는 교토와 헤이조쿄(나라)의 고대 디자인에서 영감을 받은 격자 패턴으로 설계된 몇 안 되는 일본 도시입니다. 미국의 도시들을 본떠 직선 도로와 격자 모양의 구조를 갖추고 있어 관광객들이 길 찾기가 쉽고, 대부분의 관광지가 걸어서 이동 가능합니다.',
        link: 'https://blog.naver.com/xxupqso6316/223271222774'
      },
      {
        title: '일본 최대의 식량 생산지',
        content: '홋카이도는 일본 전체 농경지의 약 1/4을 차지하며, 일본 농산물 생산의 약 22%를 담당합니다. 특히 감자, 옥수수, 밀, 사탕무 생산량이 많으며, 유제품 생산량은 일본 전체의 약 50%를 차지합니다.',
        link: 'https://blog.naver.com/kouran72/220918694405'
      },
      {
        title: '야생동물',
        content: '홋카이도에는 에조 적색 여우, 홋카이도 갈색 곰(일본에서 가장 큰 종), 그리고 단원두루미 등 일본의 다른 지역에서는 볼 수 없는 여러 종이 서식합니다. 특히 시레토코 국립공원은 유네스코 세계자연유산으로 등재되어 있는 생태계의 보고입니다.',
        link: 'https://blog.naver.com/kjhs68/223091175271'
      }
    ],
    ainu: [
      {
        title: '아이누족 소개',
        content: '아이누는 홋카이도의 토착민으로, 수천 년 동안 이 섬에 살아왔습니다. 그들의 문화는 주류 일본 문화와 확연히 다르며, 최근에야 공식적인 인정과 보호를 받기 시작했습니다.',
        link: 'https://blog.naver.com/eatloveandplay/223463666786'
      },
      {
        title: '정신적 믿음',
        content: '아이누는 자연에 대한 깊은 존경심을 가지며, 모든 것에 카무이(신/영)가 깃들어 있다고 믿습니다. 곰은 특히 산의 신으로 여겨지며, 이오만테(곰 의식)라는 특별한 의식을 통해 존경을 표합니다.',
        link: 'https://blog.naver.com/miuki73/223640986443'
      },
      {
        title: '공예품',
        content: '목각, 특히 \'키보리 쿠마\'라고 불리는 곰 조각상과 직물로 유명합니다. 아이누 여성들은 아틉(attush)이라는 나무껍질로 만든 옷과 복잡한 기하학적 패턴으로 장식된 의복을 만들었습니다.',
        link: 'https://cafe.naver.com/rou316/30192'
      },
      {
        title: '음악과 춤',
        content: '2009년 유네스코는 아이누 춤을 인류 무형 문화유산으로 지정했습니다. 전통 노래 중 하나인 \'유카르\'는 서사시로, 구전으로 전해지며 때로는 몇 시간씩 지속되기도 합니다.',
        link: 'https://blog.naver.com/miuki73/223640986443'
      },
      {
        title: '아이누 문화 체험 장소',
        content: '\'우포포이 국립 아이누 박물관과 공원\'(시라오이)은 아이누 문화 보존 및 홍보를 위한 국립 센터입니다. 또한 \'아칸 아이누 코탄\'(구시로)은 홋카이도 최대 아이누 커뮤니티 중 하나입니다.',
        link: 'https://blog.naver.com/eatloveandplay/223463666786'
      }
    ],
    culture: [
      {
        title: '온천 문화',
        content: '홋카이도는 다양한 온천으로 유명하며, 특히 노보리베츠 지역은 일본에서 가장 큰 온천지 중 하나입니다. 노보리베츠는 9가지 다른 종류의 온천수와 하루 2만 6천톤의 풍부한 용출량을 자랑하며, 온천 입욕 시에는 몸을 먼저 씻고 들어가는 일본 전통 방식을 따르는 것이 좋습니다.',
        link: 'https://blog.naver.com/kimjw4168/223267461485'
      },
      {
        title: '음식 문화',
        content: '홋카이도는 일본 내에서도 독특한 향토 요리를 자랑합니다. 특히 징기스칸(양고기 바베큐), 미소 라멘, 스프 카레는 홋카이도에서 시작된 특색 있는 요리로, 다른 지역과 다른 맛을 느낄 수 있습니다.',
        link: 'https://blog.naver.com/airirang20/223086566412'
      },
      {
        title: '축제',
        content: '삿포로 눈 축제(2월), 요사코이 소란 축제(6월), 오타루 눈빛길 축제(2월)가 유명합니다. 매년 2월 개최되는 삿포로 눈축제는 약 200만 명이 방문하는 세계 3대 눈축제 중 하나로, 봄 시즌에는 삿포로 라일락 축제가 열려 오도리 공원에 라일락이 만개해 봄의 정취를 느낄 수 있습니다.',
        link: 'https://blog.naver.com/interest11755/223755727358'
      },
      {
        title: '맥주 문화',
        content: '삿포로 맥주는 일본 최초의 맥주 브랜드 중 하나로, 1876년에 설립되었습니다. 삿포로 맥주 박물관에서는 맥주의 역사를 배우고 시음도 할 수 있으며, 맥주 가든에서는 신선한 맥주와 함께 징기스칸을 즐길 수 있습니다.',
        link: 'https://blog.naver.com/loveinfinity/223144268139'
      },
      {
        title: '홋카이도 방언',
        content: '홋카이도 사람들은 독특한 방언(홋카이도벤)을 사용합니다. 예를 들어 "나마라"(매우), "시바레루"(춥다), "메코이"(귀엽다) 등의 표현은 홋카이도에서만 들을 수 있는 방언입니다.',
        link: 'https://m.blog.naver.com/career5009/221705301989'
      }
    ],
    travel: [
      {
        title: '최적의 여행 시기',
        content: '홋카이도는 사계절 모두 볼거리가 있지만, 5월~9월이 날씨가 온화하고 봄꽃과 라벤더, 가을 단풍 등 자연 경관을 즐기기 좋습니다. 2월에는 삿포로 눈 축제로 겨울 여행도 인기가 있습니다.',
        link: 'https://www.visit-hokkaido.jp/kr/'
      },
      {
        title: '대중교통 이용',
        content: '홋카이도는 면적이 넓어 장거리 이동이 많습니다. JR 패스나 삿포로 지하철 1일권을 활용하면 경제적입니다. 일부 원거리 관광지는 버스 투어를 이용하는 것이 편리할 수 있습니다.',
        link: 'https://www.jrhokkaido.co.jp/global/korean/index.html'
      },
      {
        title: '면세 쇼핑',
        content: '외국인 여행자는 10,000엔 이상 구매 시 소비세 면세 혜택을 받을 수 있습니다. 큰 백화점이나 전자제품 매장, 관광지 상점에서는 여권을 지참하고 방문하면 면세 절차를 도와줍니다. 면세품은 여행 중 사용하지 않는 조건으로 구매해야 하며, 면세봉투를 개봉하지 않고 출국해야 합니다.',
        link: 'https://blog.naver.com/hyun901211/223302063876'
      },
      {
        title: '홋카이도 특산품',
        content: '시로이 코이비토(화이트 초콜릿 쿠키), 로이스 초콜릿, 마루세이 버터 샌드, 가니도라쿠(게 과자) 등이 인기 있는 선물용 특산품입니다. 이 외에도 홋카이도 치즈, 건조 오징어, 라벤더 제품 등이 있습니다.',
        link: 'https://blog.naver.com/he_edong/223839791351'
      },
      {
        title: '여행 준비 팁',
        content: '봄 시즌에도 아침저녁으로 쌀쌀할 수 있으니 가벼운 자켓이나 스웨터를 준비하세요. 또한 일본은 카드보다 현금 사용이 많은 편이니 충분한 현금(엔화)을 준비하거나 국제 ATM 사용이 가능한 카드를 지참하는 것이 좋습니다.',
        link: 'https://m.blog.naver.com/sticky4/221307355438'
      }
    ]
  };
  
  const selectedFacts = factsData[activeFactCategory];
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-800 mb-4">홋카이도 흥미로운 정보</h2>
      
      <div className="flex mb-6 overflow-x-auto">
        {factCategories.map((category) => (
          <button
            key={category.id}
            className={`flex-1 min-w-28 py-3 px-2 text-center font-semibold transition-all ${
              activeFactCategory === category.id
                ? 'bg-blue-600 text-white rounded-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md mx-1'
            }`}
            onClick={() => setActiveFactCategory(category.id)}
          >
            <span className="block text-xl mb-1">{category.icon}</span>
            <span className="text-sm">{category.name}</span>
          </button>
        ))}
      </div>
      
      <div className="space-y-6">
        {selectedFacts.map((fact, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-blue-100">
            <div className="bg-blue-600 p-3 text-white">
              <h3 className="text-lg font-semibold">{fact.title}</h3>
            </div>
            <div className="p-4">
              <p className="text-gray-700 mb-3">{fact.content}</p>
              <div className="flex justify-end">
                <a 
                  href={fact.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm flex items-center"
                >
                  <Globe size={16} className="mr-1" /> 더 알아보기
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {activeFactCategory === 'hokkaido' && (
        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">더 알아보세요</h3>
          <p className="text-gray-700 text-sm">
            홋카이도는 일본 전체 면적의 22%를 차지하는 일본 최대의 섬으로, 비교적 최근인 19세기에 본격적으로 개발되었습니다. 다른 일본 지역과는 다른 기후와 자연환경, 문화를 가지고 있어 마치 일본 속의 다른 나라 같은 느낌을 줍니다. 홋카이도에 대한 더 많은 정보는 <a href="https://www.visit-hokkaido.jp/kr/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">홋카이도 관광청 한국어 웹사이트</a>에서 확인하실 수 있습니다.
          </p>
        </div>
      )}
    </div>
  );
};

// 메인 컴포넌트 PropTypes - 필요시 추가할 것
HokkaidoTripPlanner.propTypes = {};

// 쇼핑 가이드 컴포넌트
const Shopping = () => {
  const [activeShoppingCategory, setActiveShoppingCategory] = useState('food');
  
  const shoppingCategories = [
    { id: 'food', name: '식품/특산물', icon: '🍽️' },
    { id: 'cosmetics', name: '화장품/뷰티', icon: '💄' },
    { id: 'crafts', name: '전통 공예품', icon: '🏮' },
    { id: 'clothes', name: '의류/잡화', icon: '👕' },
    { id: 'spots', name: '쇼핑 장소', icon: '🛍️' }
  ];
  
  const shoppingData = {
    food: [
      {
        name: '홋카이도 치즈',
        description: '풍부한 목초지에서 자란 젖소의 우유로 만든 고품질 치즈',
        places: ['신치토세 공항 쇼핑몰', '삿포로 지하상가', '도큐 백화점 식품관'],
        price: '1,500~5,000엔',
        tips: '로이치즈, 눈노우야치즈(雪印)처럼 홋카이도 현지 브랜드를 찾아보세요. 특히 까망베르 치즈와 파마산 스타일 치즈가 유명합니다.',
        image: '🧀',
        shopLink: 'https://blog.naver.com/lovepoi0306/223207639075'
      },
      {
        name: '시로이 코이비토',
        description: '화이트 초콜릿을 샌드한 쿠키로 홋카이도의 대표 과자',
        places: ['시로이 코이비토 파크', '신치토세 공항', '삿포로 주요 쇼핑몰'],
        price: '1,080엔~(12장 상자)',
        tips: '원조는 화이트초콜릿 버전이지만, 밀크초콜릿이나 계절 한정판도 살펴보세요. 본점 방문 시 박물관 특별판도 있습니다.',
        image: '🍪',
        shopLink: 'https://blog.naver.com/eojiqpfp98/223236979883'
      },
      {
        name: '홋카이도 우유/유제품',
        description: '일본 최대 낙농지대인 홋카이도의 신선한 우유와 유제품',
        places: ['모든 편의점', '슈퍼마켓', '공항 쇼핑몰'],
        price: '우유 200~300엔, 아이스크림 300~500엔',
        tips: '생우유를 사용한 치즈케이크, 아이스크림, 버터, 요거트 등을 꼭 맛보세요. 특히 르타오의 치즈케이크는 선물용으로 인기가 많습니다.',
        image: '🥛',
        shopLink: 'https://blog.naver.com/aerimy831/223290304498'
      },
      {
        name: '로이스 초콜릿',
        description: '삿포로 기반 프리미엄 초콜릿 브랜드로 다양한 맛과 형태의 초콜릿 제공',
        places: ['로이스 매장', '신치토세 공항', '삿포로역 쇼핑몰'],
        price: '700~2,500엔',
        tips: '생초콜릿(나마초코)와 감자칩 초콜릿이 가장 인기있는 제품입니다. 생초콜릿은 냉장 보관이 필요하니 여행 마지막 날 구매하는 것이 좋습니다.',
        image: '🍫',
        shopLink: 'https://blog.naver.com/travelook/222697551152'
      },
      {
        name: '홋카이도 해산물/건어물',
        description: '신선한 게, 연어, 오징어 등의 해산물 및 가공품',
        places: ['니조 시장', '산카쿠 시장(오타루)', '신치토세 공항'],
        price: '500~10,000엔 (품목에 따라 상이)',
        tips: '건조된 오징어, 연어, 성게 등이 인기 있는 선물입니다. 일부 제품은 한국 세관 규정상 반입이 제한될 수 있으니 미리 확인하세요.',
        image: '🦑',
        shopLink: 'https://blog.naver.com/iluvx/223294380069'
      },
      {
        name: '농산물/잼/차',
        description: '홋카이도의 풍부한 농작물로 만든 가공식품',
        places: ['팜 레스토랑', '로컬 마켓', '관광지 기념품점'],
        price: '500~1,500엔',
        tips: '옥수수, 감자, 멜론, 토마토, 삿포로의 라벤더와 멜론 등이 인기 있습니다. 특히 봄/여름에는 신선한 과일 및 과일잼을 살펴보세요.',
        image: '🍯',
        shopLink: 'https://blog.naver.com/ingyomarine/223104097906'
      }
    ],
    cosmetics: [
      {
        name: '유키지루시(雪印) 스킨케어',
        description: '홋카이도 우유 기반의 스킨케어 제품',
        places: ['도큐 백화점', '삿포로 드럭스토어', '신치토세 공항'],
        price: '1,200~3,000엔',
        tips: '미용액, 미유 로션, 밀크 로션 등이 인기있는 제품입니다. 건조한 피부에 좋은 보습 효과가 특징입니다.',
        image: '🧴',
        shopLink: 'https://blog.naver.com/lsb4249/223187301053'
      },
      {
        name: '라벤더 화장품',
        description: '후라노/비에이 지역의 라벤더로 만든 화장품',
        places: ['팜토미타', '삿포로 토산품점', '공항 면세점'],
        price: '800~3,000엔',
        tips: '라벤더 오일, 핸드크림, 비누 등 다양한 제품이 있습니다. 향이 진한 편이니 구매 전 테스트해 보세요.',
        image: '💐',
        shopLink: 'https://blog.naver.com/cooljjy7/222775683731'
      }
    ],
    crafts: [
      {
        name: '오타루 유리 공예품',
        description: '오타루 지역의 전통 유리 공예품',
        places: ['오타루 사카이마치 거리', '키타이치 글라스', '오타루 유리 공방'],
        price: '1,000~10,000엔',
        tips: '음악 상자, 풍경, 글라스 제품 등 다양한 제품이 있습니다. 현장에서 직접 제작하는 모습도 볼 수 있어요.',
        image: '🔮',
        shopLink: 'https://blog.naver.com/ekqwj/223272404248'
      },
      {
        name: '아이누 공예품',
        description: '홋카이도 토착민인 아이누족의 전통 공예품',
        places: ['아이누 민족 박물관', '호시노 리조트 아이누 코탄', '신치토세 공항'],
        price: '2,000~20,000엔',
        tips: '목각 공예, 자수 제품, 민속 악기 등 다양한 공예품이 있습니다. 특히 목각 곰(키보리 쿠마)은 인기 있는 기념품입니다.',
        image: '🪵',
        shopLink: 'https://blog.naver.com/smilehailey_/221606018370'
      }
    ],
    clothes: [
      {
        name: '홋카이도 브랜드 의류',
        description: '혹한기후에 맞게 개발된 현지 아웃도어/캐주얼 의류',
        places: ['삿포로 파르코', '삿포로 팩토리', '탄쿠마 아울렛'],
        price: '3,000~20,000엔',
        tips: '모코(MOKO)나 홋카이도 로컬 브랜드의 겨울 의류가 인기 있습니다. 방한 모자, 장갑, 머플러도 좋은 선물이 됩니다.',
        image: '🧥',
        shopLink: 'https://blog.naver.com/cooljjy7/222775683731'
      },
      {
        name: '홋카이도 캐릭터 상품',
        description: '홋카이도 지역 캐릭터 및 인기 캐릭터 상품',
        places: ['삿포로 지하상가', '신치토세 공항', '주요 관광지 기념품점'],
        price: '500~3,000엔',
        tips: '시로이 코이비토 캐릭터, 삿포로 곰 캐릭터, 아이누 문화 모티브 상품 등이 인기 있습니다.',
        image: '🧸',
        shopLink: 'https://blog.naver.com/aerimy831/223290304498'
      }
    ],
    spots: [
      {
        name: '탄쿠마 아울렛',
        description: '삿포로 근교의 대형 아울렛 쇼핑몰',
        location: '삿포로 시내에서 버스로 약 40분',
        features: ['100여개 브랜드', '식당가', '면세 서비스'],
        tips: '일본 및 글로벌 브랜드를 아울렛 가격에 구매할 수 있습니다. JR역에서 직통 버스도 있어 접근성이 좋습니다.',
        image: '🛍️',
        shopLink: 'https://blog.naver.com/kkm24681368/223097784329'
      },
      {
        name: '삿포로 팩토리',
        description: '옛 맥주 공장을 개조한 쇼핑몰',
        location: '삿포로 동부, JR 삿포로역에서 도보 약 20분',
        features: ['170여개 매장', '레스토랑', '엔터테인먼트'],
        tips: '쇼핑, 식사, 엔터테인먼트를 한 곳에서 즐길 수 있습니다. 구 삿포로 맥주 공장을 개조한 독특한 분위기가 특징입니다.',
        image: '🏬',
        shopLink: 'https://blog.naver.com/alslskfk/222752344073'
      },
      {
        name: '니조 시장',
        description: '삿포로의 대표적인 식품 시장',
        location: '삿포로 중심가, 오도리 공원 근처',
        features: ['신선한 해산물', '로컬 식품', '시식 코너'],
        tips: '아침 일찍 방문하면 더 신선한 해산물을 볼 수 있습니다. 시장 내 식당에서 해산물 덮밥도 맛볼 수 있어요.',
        image: '🐟',
        shopLink: 'https://blog.naver.com/iluxis/223295080979'
      },
      {
        name: '오타루 사카이마치 거리',
        description: '오타루의 전통적인 쇼핑 거리',
        location: '오타루 운하에서 도보 5분',
        features: ['유리 공예', '음악 상자', '디저트 카페'],
        tips: '오타루의 유리 공예품, 음악 상자, 르타오 치즈케이크 등을 모두 한 거리에서 만나볼 수 있습니다.',
        image: '🏮',
        shopLink: 'https://blog.naver.com/ekqwj/223272404248'
      }
    ]
  };
  
  const selectedShoppingItems = shoppingData[activeShoppingCategory];
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-800 mb-4">홋카이도 쇼핑 가이드</h2>
      <p className="text-gray-700 mb-6 bg-blue-50 p-4 rounded-lg">
        홋카이도는 신선한 식재료와 특산품, 공예품이 풍부한 지역입니다. 다양한 쇼핑 아이템과 장소를 소개해 드립니다. 특히 삿포로 시내와 오타루에는 좋은 쇼핑 장소가 많아 일정에 여유를 두고 방문하시는 것이 좋습니다.
      </p>
      
      <div className="flex mb-6 overflow-x-auto">
        {shoppingCategories.map((category) => (
          <button
            key={category.id}
            className={`flex-1 min-w-28 py-3 px-2 text-center font-semibold transition-all ${
              activeShoppingCategory === category.id
                ? 'bg-blue-600 text-white rounded-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md mx-1'
            }`}
            onClick={() => setActiveShoppingCategory(category.id)}
          >
            <span className="block text-xl mb-1">{category.icon}</span>
            <span className="text-sm">{category.name}</span>
          </button>
        ))}
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-blue-800 text-lg">🛍️ 쇼핑 시간 계획</h3>
        <ul className="mt-2 space-y-2 text-gray-700">
          <li><span className="font-medium">1일차 저녁:</span> 스스키노 지역에서 드럭스토어 방문 (화장품, 의약품)</li>
          <li><span className="font-medium">2일차 저녁:</span> 탄키코지 쇼핑거리 방문 (의류, 잡화, 기념품)</li>
          <li><span className="font-medium">3일차 오후:</span> 오타루 사카이마치 거리에서 유리공예품, 음악상자 쇼핑</li>
          <li><span className="font-medium">4일차 오전:</span> 시로이 코이비토 파크에서 과자 쇼핑</li>
          <li><span className="font-medium">4일차 공항:</span> 신치토세 공항 면세점에서 최종 쇼핑 (16:00 비행기 탑승 전)</li>
        </ul>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {selectedShoppingItems.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-blue-100">
            <div className="bg-blue-600 p-3 text-white flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-2xl mr-2">{item.image}</span>
                <h3 className="text-lg font-semibold">{item.name}</h3>
              </div>
              <a 
                href={item.shopLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-blue-600 p-1 rounded-full hover:bg-blue-50 transition-colors"
              >
                <Globe size={16} />
              </a>
            </div>
            <div className="p-4">
              <p className="text-gray-700 mb-3">{item.description}</p>
              
              {activeShoppingCategory !== 'spots' ? (
                <>
                  <div className="mb-3">
                    <h4 className="font-semibold text-blue-800 mb-1">구매 장소</h4>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
                      {item.places.map((place, idx) => (
                        <li key={idx}>{place}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <h4 className="font-semibold text-blue-800">가격대</h4>
                      <p className="text-sm text-gray-700">{item.price}</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  <h4 className="font-semibold text-blue-800 mb-1">위치 및 특징</h4>
                  <p className="text-sm text-gray-700 mb-2">{item.location}</p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
                    {item.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="bg-yellow-50 p-3 rounded-md">
                <h4 className="font-semibold text-yellow-800 mb-1">쇼핑 팁</h4>
                <p className="text-sm text-yellow-800">{item.tips}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">쇼핑 유의사항</h3>
        <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
          <li>외국인은 여권을 지참하면 10,000엔 이상 구매 시 <strong>8% 소비세 면세</strong> 혜택을 받을 수 있습니다.</li>
          <li>면세품은 여행 중 사용하지 않는 조건으로 구매해야 하며, 면세봉투를 개봉하지 않고 출국해야 합니다.</li>
          <li>삿포로의 대부분 상점은 오전 10시에 문을 열고 밤 8시 또는 9시에 닫습니다.</li>
          <li>식품류는 한국 입국 시 검역 규정에 따라 제한될 수 있으니 미리 확인하세요.</li>
          <li>시로이 코이비토 파크와 같은 인기 있는 장소는 주말에 매우 붐비므로 평일 방문을 권장합니다.</li>
        </ul>
      </div>
    </div>
  );
};

// 여행 준비 컴포넌트
const TodoList = () => {
  const todoCategories = [
    { id: 'before', title: '출발 전 준비', icon: '✈️' },
    { id: 'booking', title: '예약 사항', icon: '🏨' },
    { id: 'packing', title: '짐 준비', icon: '🧳' },
    { id: 'documents', title: '필요 서류', icon: '📄' },
    { id: 'apps', title: '유용한 앱', icon: '📱' }
  ];
  
  const [activeCategory, setActiveCategory] = useState('before');
  
  const todoData = {
    before: [
      { 
        task: '여권 유효기간 확인', 
        description: '여권 유효기간이 최소 6개월 이상 남아있는지 확인하세요.',
        deadline: '출발 2개월 전',
        status: 'completed',
        priority: 'high',
        link: 'https://www.passport.go.kr/new/index.do'
      },
      { 
        task: '항공권 예약', 
        description: '인천-신치토세 구간 항공권 예약 (대한항공 KE769/KE770)',
        deadline: '출발 2개월 전',
        status: 'completed',
        priority: 'high',
        link: 'https://www.koreanair.com/'
      },
      { 
        task: '삿포로 호텔 예약 확정됨', 
        description: '포르자 삿포로 스테이션 호텔 5/31-6/2 (2박) 예약 완료',
        deadline: '완료됨',
        status: 'completed',
        priority: 'high',
        link: 'https://www.booking.com/hotel/jp/hoteruhuorutuazha-huang-yi-qian.ko.html'
      },
      { 
        task: '여행자 보험 가입', 
        description: '해외 여행자 보험에 가입하여 만일의 사고나 질병에 대비하세요.',
        deadline: '출발 2주 전',
        status: 'pending',
        priority: 'medium',
        link: 'https://www.samsungfire.com/product/P_0402/P_0402_0010_01.html'
      },
      { 
        task: '날씨 확인 및 의류 준비', 
        description: '봄 시즌 홋카이도 날씨 확인 (낮 15-20°C, 밤 7-12°C)',
        deadline: '출발 1주 전',
        status: 'pending',
        priority: 'medium',
        link: 'https://www.weather.go.kr/w/theme/world-weather.do'
      },
      { 
        task: '환전하기', 
        description: '여행 경비 일본 엔화로 환전 (카드 사용 외 현금 약 10만엔 준비)',
        deadline: '출발 1주 전',
        status: 'pending',
        priority: 'high',
        link: 'https://www.koreaexim.go.kr/site/program/exchange/exchange'
      },
      { 
        task: '로밍 서비스 신청', 
        description: '해외 로밍 서비스 신청 또는 일본 현지 유심 구매 계획',
        deadline: '출발 1주 전',
        status: 'pending',
        priority: 'medium',
        link: 'https://roaming.kt.com/renewal/main.do'
      },
      {
        task: '인천공항 주차 예약',
        description: '인천공항 제2터미널 장기 주차장 예약 (4일)',
        deadline: '출발 2주 전',
        status: 'pending',
        priority: 'high',
        link: 'https://www.airport.kr/ap/ko/tpt/parkingReservation.do'
      }
    ],
    booking: [
      { 
        task: '항공권 예약 완료', 
        description: '인천-신치토세 왕복 항공권 (KE769/KE770)',
        details: [
          '가는 날: 5/31 (토) 12:35 인천공항 터미널 2 → 15:20 삿포로/치토세공항 터미널 I (KE769)',
          '오는 날: 6/3 (화) 16:20 삿포로/치토세공항 터미널 I → 19:30 인천공항 터미널 2 (KE770)',
          '기종: A321-neo'
        ],
        status: 'completed',
        priority: 'high'
      },
      { 
        task: '삿포로 호텔 예약 (2박)', 
        description: '포르자 삿포로 스테이션 호텔',
        details: [
          '체크인: 5/31 (토) 15:00 이후',
          '체크아웃: 6/2 (월) 10:00 이전',
          '객실 타입: 더블룸 (금연)',
          '조식 불포함',
          '2박 숙박 확정'
        ],
        status: 'completed',
        priority: 'high',
        link: 'https://www.booking.com/hotel/jp/hoteruhuorutuazha-huang-yi-qian.ko.html'
      },
      { 
        task: '오타루 호텔 예약 (1박)', 
        description: '그리드 프리미엄 호텔 오타루',
        details: [
          '체크인: 6/2 (월) 15:00 이후',
          '체크아웃: 6/3 (화) 10:00 이전',
          '객실 타입: 소형 트윈룸',
          '조식 불포함',
          '1박 숙박 확정'
        ],
        status: 'completed',
        priority: 'high',
        link: 'https://www.agoda.com/grids-premium-hotel-otaru/hotel/otaru-jp.html'
      },
      { 
        task: '모이와산 로프웨이 예약', 
        description: '모이와산 로프웨이 + 미니 케이블카 왕복 티켓',
        details: [
          '날짜: 6/3 (화) 오전',
          '시간: 8:00 예약 (혼잡 피하기 위한 아침 방문)',
          '요금: 1인 1,700엔 (현장 구매 가능)'
        ],
        status: 'optional',
        priority: 'low',
        link: 'https://blog.naver.com/hacwatch/223703328160'
      },
      { 
        task: '시로이 코이비토 쿠킹 클래스 예약', 
        description: '쿠키 만들기 체험 (선택사항)',
        details: [
          '날짜: 6/3 (화) 오전',
          '시간: 11:00-12:00',
          '요금: 1인 1,500엔',
          '영어 가이드 필요 여부 확인'
        ],
        status: 'optional',
        priority: 'low',
        link: 'https://blog.naver.com/he_edong/223839791351'
      }
    ],
    packing: [
      { 
        task: '의류', 
        description: '봄 시즌 홋카이도 날씨에 맞는 의류',
        items: [
          '얇은 긴팔 셔츠/블라우스 3-4벌',
          '긴바지/청바지 2벌',
          '가디건/얇은 점퍼 1벌 (저녁 기온 하락 대비)',
          '가벼운 재킷 1벌',
          '편안한 워킹화/운동화',
          '양말 4-5켤레',
          '속옷 4-5벌',
          '잠옷'
        ],
        status: 'pending',
        priority: 'high'
      },
      { 
        task: '전자기기', 
        description: '필요한 전자기기 및 충전기',
        items: [
          '휴대폰 + 충전기',
          '카메라 + 충전기 + 메모리카드',
          '보조배터리',
          '일본용 어댑터 (필요시)',
          '이어폰'
        ],
        status: 'pending',
        priority: 'high'
      },
      { 
        task: '세면도구/화장품', 
        description: '필수 세면도구 및 화장품',
        items: [
          '칫솔, 치약',
          '샴푸, 린스, 바디워시 (호텔 제공 제품 사용 가능)',
          '화장품, 선크림',
          '화장솜, 클렌징 오일',
          '면도기, 빗'
        ],
        status: 'pending',
        priority: 'medium'
      },
      { 
        task: '의약품', 
        description: '기본 구급약 및 개인 필수 의약품',
        items: [
          '상비약 (두통약, 소화제, 밴드)',
          '개인 처방약',
          '감기약',
          '마스크'
        ],
        status: 'pending',
        priority: 'medium'
      },
      { 
        task: '기타 필수품', 
        description: '여행 시 필요한 기타 물품',
        items: [
          '여권',
          '항공권 (모바일/출력본)',
          '숙소 예약 확인서 (모바일/출력본)',
          '현금 (엔화) + 신용카드',
          '우산/접이식 우산',
          '선글라스',
          '가방/백팩 (일정용)',
          '쇼핑용 접이식 에코백'
        ],
        status: 'pending',
        priority: 'high'
      }
    ],
    documents: [
      { 
        task: '여권', 
        description: '유효기간 6개월 이상 남은 여권을 준비하세요.',
        note: '여권은 항상 몸에 지니고 다니거나 호텔 금고에 보관하세요.',
        status: 'pending',
        priority: 'high'
      },
      { 
        task: '항공권', 
        description: '예약 번호와 e-티켓을 모바일 기기에 저장하고, 출력본도 준비하세요.',
        note: '항공사 앱을 설치하면 체크인 및 탑승 정보 확인이 용이합니다.',
        status: 'pending',
        priority: 'high'
      },
      { 
        task: '호텔 예약 확인서', 
        description: '호텔 예약 확인서를 모바일 기기에 저장하고, 출력본도 준비하세요.',
        note: '예약 사이트 앱이나 이메일에 보관하면 편리합니다.',
        status: 'pending',
        priority: 'high'
      },
      { 
        task: '여행자 보험 증서', 
        description: '여행자 보험 가입 후 보험 증서를 모바일 기기에 저장하세요.',
        note: '보험사 연락처와 보상 절차도 함께 확인하세요.',
        status: 'pending',
        priority: 'medium'
      },
      { 
        task: '신용카드', 
        description: '해외 사용 가능한 신용카드와 직불카드를 준비하세요.',
        note: '카드사에 해외 사용 예정임을 미리 통보하면 차단 방지에 도움이 됩니다.',
        status: 'pending',
        priority: 'high'
      },
      { 
        task: '여행 일정표', 
        description: '전체 여행 일정과 주요 장소 정보가, 주소가 포함된 일정표를 준비하세요.',
        note: '모바일과 출력본 모두 준비하는 것이 좋습니다.',
        status: 'pending',
        priority: 'medium'
      }
    ],
    apps: [
      { 
        name: 'Japan Travel by NAVITIME', 
        description: '일본 대중교통 안내 앱',
        features: ['기차/버스 시간표', '노선 검색', '오프라인 지도'],
        platform: 'iOS/Android',
        link: 'https://play.google.com/store/apps/details?id=com.navitime.inbound.walk&hl=ko&gl=US'
      },
      { 
        name: 'Google Maps', 
        description: '지도 및 네비게이션',
        features: ['경로 안내', '대중교통 정보', '지역 검색'],
        platform: 'iOS/Android',
        link: 'https://play.google.com/store/apps/details?id=com.google.android.apps.maps&hl=ko&gl=US'
      },
      { 
        name: 'Google Translate', 
        description: '번역 앱',
        features: ['카메라 번역', '음성 번역', '오프라인 모드'],
        platform: 'iOS/Android',
        link: 'https://play.google.com/store/apps/details?id=com.google.android.apps.translate&hl=ko&gl=US'
      },
      { 
        name: 'XE Currency', 
        description: '환율 계산 앱',
        features: ['실시간 환율', '오프라인 모드', '다중 통화 지원'],
        platform: 'iOS/Android',
        link: 'https://play.google.com/store/apps/details?id=com.xe.currency&hl=ko&gl=US'
      },
      { 
        name: '트립닷컴 (Trip.com)', 
        description: '호텔 예약 관리 앱',
        features: ['예약 정보 관리', '호텔 체크인 자료', '24시간 고객 서비스'],
        platform: 'iOS/Android',
        link: 'https://play.google.com/store/apps/details?id=ctrip.english&hl=ko&gl=US'
      }
    ]
  };
  
  const renderTodoContent = () => {
    switch(activeCategory) {
      case 'before':
      case 'booking':
        return (
          <div className="space-y-4">
            {todoData[activeCategory].map((item, index) => (
              <div key={index} className={`p-4 rounded-lg border ${
                item.status === 'completed' ? 'border-green-200 bg-green-50' : 
                item.status === 'pending' ? 'border-yellow-200 bg-yellow-50' : 
                'border-gray-200 bg-gray-50'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div className={`mt-1 w-5 h-5 rounded-full flex-shrink-0 ${
                      item.status === 'completed' ? 'bg-green-500' : 
                      item.status === 'pending' ? 'bg-yellow-500' : 
                      'bg-gray-400'
                    }`}>
                      {item.status === 'completed' && (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                          <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="ml-3">
                      <h3 className={`font-semibold ${
                        item.status === 'completed' ? 'text-green-800' : 
                        item.status === 'pending' ? 'text-yellow-800' : 
                        'text-gray-800'
                      }`}>{item.task}</h3>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      
                      {item.details && (
                        <div className="mt-2 space-y-1">
                          {item.details.map((detail, idx) => (
                            <p key={idx} className="text-xs text-gray-600">• {detail}</p>
                          ))}
                        </div>
                      )}
                      
                      {item.deadline && (
                        <p className="text-xs text-blue-600 mt-2">마감: {item.deadline}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0">
                    <span className={`inline-block rounded-full text-xs px-2 py-1 ${
                      item.priority === 'high' ? 'bg-red-100 text-red-800' : 
                      item.priority === 'medium' ? 'bg-blue-100 text-blue-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.priority === 'high' ? '높음' : 
                       item.priority === 'medium' ? '중간' : '낮음'}
                    </span>
                  </div>
                </div>
                
                {item.link && (
                  <div className="mt-3 ml-8">
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-sm text-blue-600 hover:underline flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      관련 링크
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      
      case 'packing':
        return (
          <div className="space-y-4">
            {todoData.packing.map((category, index) => (
              <div key={index} className="p-4 rounded-lg border border-blue-200 bg-blue-50">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-blue-800">{category.task}</h3>
                    <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                  </div>
                  <span className={`inline-block rounded-full text-xs px-2 py-1 ${
                    category.priority === 'high' ? 'bg-red-100 text-red-800' : 
                    category.priority === 'medium' ? 'bg-blue-100 text-blue-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {category.priority === 'high' ? '높음' : 
                     category.priority === 'medium' ? '중간' : '낮음'}
                  </span>
                </div>
                
                <div className="mt-3">
                  <h4 className="text-sm font-medium text-blue-700 mb-2">준비물 목록:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {category.items.map((item, idx) => (
                      <div key={idx} className="flex items-start">
                        <div className="h-5 w-5 border border-blue-400 rounded mr-2 mt-0.5 flex-shrink-0"></div>
                        <p className="text-sm text-gray-700">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
        
      case 'documents':
        return (
          <div className="space-y-4">
            {todoData.documents.map((doc, index) => (
              <div key={index} className="p-4 rounded-lg border border-indigo-200 bg-indigo-50">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-indigo-800">{doc.task}</h3>
                    <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
                    {doc.note && (
                      <p className="text-xs text-indigo-600 mt-2 italic">💡 {doc.note}</p>
                    )}
                  </div>
                  <span className={`inline-block rounded-full text-xs px-2 py-1 ${
                    doc.priority === 'high' ? 'bg-red-100 text-red-800' : 
                    doc.priority === 'medium' ? 'bg-blue-100 text-blue-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {doc.priority === 'high' ? '높음' : 
                     doc.priority === 'medium' ? '중간' : '낮음'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        );
        
      case 'apps':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {todoData.apps.map((app, index) => (
              <div key={index} className="p-4 rounded-lg border border-purple-200 bg-purple-50">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-purple-800">{app.name}</h3>
                  <span className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded-full">
                    {app.platform}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{app.description}</p>
                
                <div className="mt-3">
                  <h4 className="text-xs font-medium text-purple-700 mb-1">주요 기능:</h4>
                  <div className="flex flex-wrap gap-2">
                    {app.features.map((feature, idx) => (
                      <span key={idx} className="text-xs bg-white text-purple-700 px-2 py-1 rounded-full border border-purple-200">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-3">
                  <a 
                    href={app.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm text-purple-600 hover:underline flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    다운로드
                  </a>
                </div>
              </div>
            ))}
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-800 mb-4">여행 준비 체크리스트</h2>
      
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <p className="text-gray-700">
          성공적인 홋카이도 여행을 위한 준비 사항을 체크리스트로 정리했습니다. 여행 전 예약, 필요한 물품, 서류, 앱 등을 미리 준비하여 즐겁고 편안한 여행이 되도록 하세요.
        </p>
      </div>
      
      <div className="flex mb-6 overflow-x-auto">
        {todoCategories.map((category) => (
          <button
            key={category.id}
            className={`flex-1 min-w-28 py-3 px-2 text-center font-semibold transition-all ${
              activeCategory === category.id
                ? 'bg-blue-600 text-white rounded-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md mx-1'
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            <span className="block text-xl mb-1">{category.icon}</span>
            <span className="text-sm">{category.title}</span>
          </button>
        ))}
      </div>
      
      {renderTodoContent()}
      
      <div className="mt-6 bg-yellow-50 p-4 rounded-lg">
        <h3 className="font-semibold text-yellow-800 mb-2">여행 준비 유의사항</h3>
        <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
          <li>여권, 항공권, 예약정보는 모바일과 출력본으로 모두 준비하는 것이 안전합니다.</li>
          <li>봄 시즌 홋카이도는 기온 차이가 있어 겹쳐 입을 수 있는 옷을 준비하세요.</li>
          <li>환율 변동이 있을 수 있으니 여행 2-3일 전에 환전하는 것이 유리합니다.</li>
          <li>일본은 카드 사용이 가능하지만, 일부 소규모 상점이나 식당은 현금만 받는 경우가 있습니다.</li>
          <li>일본 전기 콘센트는 한국과 동일한 A형 플러그를 사용하므로 변환 어댑터가 필요없습니다.</li>
        </ul>
      </div>
    </div>
  );
};

export default HokkaidoTripPlanner;