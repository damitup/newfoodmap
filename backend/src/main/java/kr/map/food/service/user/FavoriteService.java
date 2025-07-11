package kr.map.food.service.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.map.food.domain.user.FavoriteDTO;
import kr.map.food.mapper.user.FavoriteRepository;

@Service
public class FavoriteService implements UserAction {
    
    @Autowired
    private FavoriteRepository favoriteRepository;

    @Override()
    public void addFavorite(FavoriteDTO dto) {
        favoriteRepository.insertFavorite(dto);
    }

    @Override
    public void removeFavorite(FavoriteDTO dto) {
        favoriteRepository.deleteFavorite(dto);
    }

    @Override
    public boolean isFavorite(FavoriteDTO dto) {
        return favoriteRepository.isFavorite(dto);
    }
}
