package kr.map.food.service.user;


import kr.map.food.domain.user.FavoriteDTO;

public interface  UserAction {
    void addFavorite(FavoriteDTO dto);
    void removeFavorite(FavoriteDTO dto);
    boolean isFavorite(FavoriteDTO dto);
    
}
