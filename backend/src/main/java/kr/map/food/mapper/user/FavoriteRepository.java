package kr.map.food.mapper.user;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.map.food.domain.user.FavoriteDTO;

@Mapper
public interface FavoriteRepository {

    void insertFavorite(FavoriteDTO dto);

    void deleteFavorite(FavoriteDTO dto);

    List<FavoriteDTO> getFavoritesByUser(String userIdx);

}