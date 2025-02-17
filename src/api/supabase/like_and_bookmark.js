import { supabase } from '@/config/supabase';

// 포스트글 좋아요 누르기
export const toggleLike = async (post_id) => {
  const { data, error } = await supabase.rpc('toggle_post_like', {
    input_post_id: post_id,
  });
  if (error) console.error('Error:', error);
  else {
    return data;
  }
};
// 사용자 게시글 좋아요 정보 가져오기
export const getUserPostLikes = async () => {
  const { data, error } = await supabase.rpc('get_user_post_likes');
  if (error) console.error('Error:', error);
  else {
    return data;
  }
};

// 북마크 담기
export const toggleBookmark = async (post_id) => {
  const { data, error } = await supabase.rpc('toggle_bookmark', {
    post_id,
  });
  if (error) {
    console.error('Error:', error);
    return null;
  } else {
    return data;
  }
};

// 특정 게시물의 좋아요 개수 조회
export const getLikeCount = async (postId) => {
  const { data, error } = await supabase
    .from('post_like')
    .select('post_id', { count: 'exact' })
    .eq('post_id', postId);

  if (error) {
    console.error('좋아요 개수 조회 오류:', error);
    return 0;
  }

  return data.length; // 조회된 데이터 길이가 좋아요 개수
};
