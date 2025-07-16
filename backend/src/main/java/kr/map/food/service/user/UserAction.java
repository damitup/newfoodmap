package kr.map.food.service.user;


import java.util.List;

import kr.map.food.domain.user.FavoriteDTO;

public interface  UserAction {
    void addFavorite(FavoriteDTO dto);
    void removeFavorite(FavoriteDTO dto);
    List<FavoriteDTO> getFavoritesByUser(String userIdx);
    
}
