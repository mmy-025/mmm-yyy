import { create } from 'zustand';

// 用户状态
interface UserState {
  user: any;
  setUser: (user: any) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

// 学习状态
interface LearningState {
  currentCourse: number | null;
  currentChapter: number | null;
  progress: Record<string, Record<string, boolean>>;
  setCurrentCourse: (courseId: number | null) => void;
  setCurrentChapter: (chapterId: number | null) => void;
  updateProgress: (courseId: number, chapterId: number, completed: boolean) => void;
}

// 成就状态
interface AchievementState {
  achievements: Array<{ id: number; name: string; description: string; icon: string; unlocked: boolean; }>;
  setAchievements: (achievements: Array<{ id: number; name: string; description: string; icon: string; unlocked: boolean; }>) => void;
  unlockAchievement: (achievementId: number) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  isLoading: true,
  setIsLoading: (loading) => set({ isLoading: loading }),
}));

export const useLearningStore = create<LearningState>((set) => ({
  currentCourse: null,
  currentChapter: null,
  progress: {},
  setCurrentCourse: (courseId) => set({ currentCourse: courseId }),
  setCurrentChapter: (chapterId) => set({ currentChapter: chapterId }),
  updateProgress: (courseId, chapterId, completed) => set((state) => ({
    progress: {
      ...state.progress,
      [courseId]: {
        ...state.progress[courseId],
        [chapterId]: completed,
      },
    },
  })),
}));

export const useAchievementStore = create<AchievementState>((set) => ({
  achievements: [],
  setAchievements: (achievements) => set({ achievements }),
  unlockAchievement: (achievementId) => set((state) => ({
    achievements: state.achievements.map((achievement) =>
      achievement.id === achievementId ? { ...achievement, unlocked: true } : achievement
    ),
  })),
}));
