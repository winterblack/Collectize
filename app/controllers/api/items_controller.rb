class Api::ItemsController < ApplicationController

  def create
    @item = Item.create!(item_params)
    render json: @item
  end

  def index
    @items = Item.where(collection_id: params[:collection_id])
  end

  def update
    @item = Item.find(params[:id])
    @item.update(item_params)
    render json: @item
  end

  def destroy
    @item = Item.find(params[:id])
    @item.destroy
    render json: @item
  end

  private

  def item_params
    params.require(:item).permit(:title, :image_url, :collection_id)
  end
end
