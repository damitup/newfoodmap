package kr.map.food.mapper.user;

import org.apache.ibatis.annotations.Mapper;

import kr.map.food.domain.user.FavoriteDTO;

@Mapper
public interface FavoriteRepository {

    void insertFavorite(FavoriteDTO dto);

    void deleteFavorite(FavoriteDTO dto);

    boolean isFavorite(FavoriteDTO dto);
}